
;; title: smart-account
;; version:
;; summary: This the account entrypoint
;; description:   i.e. an account w/ social recovery, sub-accounts and sessions

;; traits
;;
(define-trait account
    (

      ;; @param signature
      ;; @param name
      ;; @param type
      ;; @returns sub-account address
      (create-sub-account ((buff 40) (string-utf8 100) uint) (response uint uint))

      ;; @returns eventId
      (destroy-sub-account (uint) (response uint uint))

      ;; Authenticate user
      ;; @param proof
      (authenticate ((buff 40)) (response uint uint))

      ;; @param pubkey
      ;; @param signature
      ;; @param duration
      (call ((buff 40) (buff 100) uint) (response uint uint))

      ;; @param signature
      ;; @param transaction TODO Figure this out
      (submit-transaction ((buff 100) (buff 100)) (response uint uint))
      
      ;; @param signature
      (create-safe ((buff 40)) (response principal uint))

      ;; @param signature
      ;; @param transaction TODO Figure this out
      (transfer-to-safe ((buff 100) (buff 100)) (response uint uint))

      ;; @param auth type
      ;; @param signature
      ;; @param transaction TODO Figure this out
      (transfer-to-eoa (principal uint (buff 100) (buff 100)) (response uint uint))


      (is-contract-new () (response bool uint))
    )
)

;; token definitions
;;

;; constants
;;

;; data vars
;;
(define-data-var init bool false)
(define-data-var sub-accounts-count int 0)
(define-data-var first-valid-sub-account int 0)
(define-data-var owner (buff 33) 0x0000000000000000000000000000000000000000000000000000000000000000)
(define-data-var safe-address (buff 33) 0x0000000000000000000000000000000000000000000000000000000000000000)

;; Each authentication assumes that a user signs the nonce and the nonce is increased
(define-data-var nonce uint u0)

;; data maps
;;
;; @params name Name of the sub account
;; @params type Sub-account type, u0: permanent, u1: virtual
;; @params transaction-limit Number of transaction this sub-account can sign
;; @params nonce
;; @params status u0: Active, u1: Closed
(define-map sub-accounts int
  {
    name: (string-ascii 40),
    type: uint,
    transaction-limit: uint,
    nonce: uint,
    status: uint,
    is-session-active: bool,
    session-key: (buff 33),
  }
)

;; public functions
;;

;; @params pub-key Compressed public-key
(define-public (add-new-pub-key-to-account (name (string-ascii 40)) (current-pub-key (buff 33)) (new-pub-key (buff 33)) (signature (buff 33)))
  (let
    ;; Verify ownership of account
    (
      (signer-public-key (unwrap!  (secp256k1-recover? (sha256 new-pub-key) signature) (err "error recovering pub key")))
    )
    (asserts! (is-eq current-pub-key signer-public-key) (err "not the owner"))
    (asserts! (> (len name) u0) (err "empty name"))
    
    (print (concat "Submit new public key for " name)) 
  
    ;; (var-set accounts-amount (+ (var-get accounts-amount) u1))
    ;; (ok (var-get accounts-amount))
    (ok u1)
  )
)


;; @param signature
;; @param name
;; @param type
;; @returns sub-account address
(define-public (create-sub-account (signature (buff 40)) (name (string-ascii 40)) (requested-session-key (buff 33)) (type uint)) 
  (begin
    ;; Verify signature
    (ok (creates-sub-account name type u100 requested-session-key))
  )
)

;; @returns true if there are existing active sub-accounts
(define-public (destroy-first-sub-account (sub-account-id uint))
  (begin
    (var-set first-valid-sub-account (+ (var-get first-valid-sub-account) 1))
    (ok (is-eq (var-get first-valid-sub-account) (var-get sub-accounts-count)))
  )
)

;; Authenticate user
;; @param proof
;; @param auth-type u0
(define-public (authenticate (message-hash (buff 32)) (signature (buff 64)) (auth-type uint) (requested-session-key (buff 33))) 
  (begin 
    (asserts! (is-eq auth-type u0) (err "not supported"))

    (unwrap! (contract-call? .passkeysv1 verify-signature message-hash (var-get owner) signature)

     (err "thrown"))

    (if (or (is-eq (var-get sub-accounts-count) 0) (is-eq (var-get sub-accounts-count) (var-get first-valid-sub-account)))
      (begin 
        ;; Create a new sub-account if none is available
        ;; TODO Wtf?
        ;; (unwrap! (creates-sub-account (concat "sub-accoun-" (var-get first-valid-sub-account)) auth-type u20) (err "error creating sub-account"))
        (unwrap! (creates-sub-account "sub-account" auth-type u20 requested-session-key) (err "error creating sub-account") )
        (print "Creating new sub-account")
      )
      (print "Valid sub-account exists")
    )
    (ok true)
  )
)

;; @param signature
(define-public (create-safe (message-hash (buff 32)) (signature (buff 64)) (safes-address (buff 33))) 
  (begin 
    (asserts! 
      (unwrap! (contract-call? .passkeysv1 verify-signature message-hash (var-get owner) signature) (err "err call"))
      (err "authentication failed"))
    (asserts! (is-eq (len safes-address) u33) (err "safe public key wrong length"))
    (asserts! (not (is-eq safes-address 0x0000000000000000000000000000000000000000000000000000000000000000)) (err "account already has safe"))
    (unwrap! (principal-of? safes-address) (err "error getting principal from public key"))
    (var-set safe-address safes-address)

    (ok true)
  )
)

;; @param signature
(define-public (transfer-to-safe (signature (buff 100)) (amount uint)) (err "not implemented"))

;; @param signature
;; @param transaction TODO Figure this out
(define-public (transfer-to-eoa (eoa-address principal) (signature (buff 100))) (err "not implemented"))

;; This has to be SIP-005 compatible; https://github.com/stacksgov/sips/blob/main/sips/sip-005/sip-005-blocks-and-transactions.md
;; TODO Submit any transaction
;; @params account-id -1: main account, 0,1,..: sub-accounts
(define-public (call (auth-type uint)
                  (signature (buff 64))
                  (transaction (buff 100))
                  (transaction-hash (buff 32))
                  (requested-session-key (buff 33))
                  (account-id int)) 
    (let
      ;; Deconstruct the transaction
      (
        (t (from-consensus-buff? { to: principal, amount: int, fn: (string-ascii 20) } transaction))
        (sub-account (unwrap! (map-get? sub-accounts account-id) (err "error")))
        (public-key
          (if
            (is-eq account-id 0)
            (var-get owner)
            (if
              (is-eq (get is-session-active sub-account) false)
              (get session-key sub-account)
              (var-get owner)
            )
          )
        )
      )

      ;; Authenticate w/ account or sub-account
      (asserts! 
        (unwrap! (contract-call? .passkeysv1 verify-signature transaction-hash public-key signature) (err "err call"))
        (err "authentication failed")
      )

      ;; TODO Check if account/sub-account can execute transaction
      (asserts!
        (unwrap! (check-permissions account-id transaction) (err "cannot execute transaction"))
        (err "account/sub-account cannot run transaction")
      )
     
      ;; Execute transaction
      (if
      ;; Mint NFT for the demo purposes
        (is-eq (unwrap! (get fn t) (err "wrong")) "mintNft")
        (print "ok")
        (print "not ok")
      )

      ;; Create new session if account type is a sub-account and new session key is requested
      (unwrap! (creates-sub-account "sub-account" u0 u20 requested-session-key) (err "error creating sub-account") )

      ;; TODO Refund gas to bundler

      (ok true)
      )
)

(define-public (check-permissions (account-id int) (transaction (buff 100))) (ok true))

;; read only functions
;;

(define-read-only (is-contract-new) (ok (var-get init)))

(define-read-only (get-sub-account (sub-account-id int)) (map-get? sub-accounts sub-account-id))

(define-read-only (get-first-sub-account) (map-get? sub-accounts (var-get first-valid-sub-account)))

;; private functions
;;

(define-private (creates-sub-account (name (string-ascii 40)) (type uint) (transaction-limit uint) (requested-session-key (buff 33)))
  (begin
  (var-set sub-accounts-count (+ (var-get sub-accounts-count) 1))
    (map-set sub-accounts (var-get first-valid-sub-account) {
      ;; TODO
      ;; name: "name",
      name: name,
      type: type,
      transaction-limit: transaction-limit,
      nonce: u0,
      status: u0,
      session-key: requested-session-key,
      is-session-active: true,
    })
    (ok (var-get first-valid-sub-account))
  )
)

