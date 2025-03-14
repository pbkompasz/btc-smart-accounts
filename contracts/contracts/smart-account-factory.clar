
;; title: smart-account-factory
;; version:
;; summary:
;; description:

;; traits
;;
(define-trait account
    (
      ;; @param name
      ;; @returns account address
      (create ((string-utf8 100)) (response principal uint))

    )
)

;; token definitions
;;

;; constants
;;
(define-constant err-not-the-maker (err u101))

;; data vars
;;
(define-data-var accounts-amount uint u0)

;; data maps
;;

;; Map signature to account principal
(define-map accounts (buff 65) principal)

;; public functions
;;

;; @params pub-key Compressed or uncompressed public-key. Compressed pub-key (w/ length 33 bytes) is prepend with 0s
(define-public (create (name (string-ascii 40)) (pub-key (buff 65)))
  (let 
    (
      (addr (unwrap-panic (principal-construct? 0x1a 0xfa6bf38ed557fe417333710d6033e9419391a320 name)))
      ;; (addr 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)
    )
    (print (concat "Create account for: " name)) 
    (map-set accounts pub-key addr)
    (var-set accounts-amount (+ (var-get accounts-amount) u1))
    (ok addr)
  )
)

;; read only functions
;;
(define-read-only (get-account (pub-key (buff 65))) (begin 
  (map-get? accounts pub-key)
))

;; private functions
;;

