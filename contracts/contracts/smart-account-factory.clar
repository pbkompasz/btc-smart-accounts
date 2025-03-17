;; title: smart-account-factory
;; version:
;; summary: This the account entrypoint
;; description:   i.e. an account w/ social recovery, sub-accounts and sessions

;; traits
;;
(define-trait account-factory
    (

     
    )
)

;; token definitions
;;

;; constants
;;

;; data vars
;;
(define-data-var accounts-amount uint u0)

;; Each authentication assumes that a user signs the nonce and the nonce is increased
(define-data-var nonce uint u0)

;; data maps
;;
(define-map accounts (buff 33) { account-name : (string-ascii 40), address: principal })

;; public functions
;;

(use-trait account .smart-account.account)

;; @params pub-key Compressed public-key.
(define-public (create-account (name (string-ascii 40)) (pub-key (buff 33)) (deployed-account <account>) (account-address principal))
  (begin 
    (asserts! (> (len name) u0) (err "empty name"))
    (asserts! (> (len pub-key) u0) (err "empty pub key"))
    ;; TODO Change is to dynamic contract name
    (asserts! (not (unwrap! (contract-call?  deployed-account is-contract-new) (err "asd"))) (err "supplied contract already initiated"))
    ;; TODO Check if supplied contract implements the trait/matches smart-account contract's hash?


    (print (concat "Create account for: " name)) 
    (map-set accounts pub-key { account-name: name, address: account-address })
    (var-set accounts-amount (+ (var-get accounts-amount) u1))
    (ok (var-get accounts-amount))
  )
)

;; read only functions
;;

(define-read-only (get-account (pub-key (buff 33))) (begin 
  (map-get? accounts pub-key)
))



;; private functions
;;

