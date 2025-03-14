
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
      (create-session ((buff 40) (buff 100) uint) (response uint uint))

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
    )
)

;; token definitions
;;

;; constants
;;

;; data vars
;;

;; Each authentication assumes that a user signs the nonce and the nonce is increased
(define-data-var nonce uint u0)

;; data maps
;;
(define-map sub-accounts int { name: (string-ascii 40), type: uint })

;; public functions
;;
;; (define-public (create (name (string-utf8 100)))
;;     (begin
;;       (ok "the number is even")
;;     )
;; )

;; This has to be SIP-005 compatible; https://github.com/stacksgov/sips/blob/main/sips/sip-005/sip-005-blocks-and-transactions.md
(define-public (call (owner principal)
                                   (authType uint)
                                   (signature (buff 100))
                                   (transaction (buff 100))) 
    (let
      ;; Deconstruct the transaction
      ((t (from-consensus-buff? { to: principal, amount: int } transaction)))
      (get to t)
      (get amount t)

      ;; Submit transaction

      (ok u1))
)

;; read only functions
;;

;; private functions
;;

