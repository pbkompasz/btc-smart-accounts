
;; title: webauthn
;; version:
;; summary: Generate challenge, verify signature, etc.
;; description:

;; traits
;;

;; token definitions
;;

;; constants
;;

;; data vars
;;

;; data maps
;;

;; public functions
;;

(define-public (verify-signature (message-hash (buff 32)) (public-key (buff 33)) (signature (buff 64))) (ok true))

;; read only functions
;;

;; private functions
;;

