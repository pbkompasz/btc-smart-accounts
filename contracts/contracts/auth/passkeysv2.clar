;; title: verify
;; version: P-256 verifier
;; summary: A library to verify ECDSA signatures made on the secp256r1 curve
;; description:

;; traits
;;

;; token definitions
;;

;; constants
;;
(define-constant secp256r1-bits u256)
(define-constant secp256r1-p (tuple (i0 u18446744069414584321) (i1 u0) (i2 u4294967295) (i3 u18446744073709551615)))
(define-constant secp256r1-b (tuple (i0 u6540974713487397863) (i1 u12964664127075681980) (i2 u7285987128567378166) (i3 u4309448131093880907)))
(define-constant secp256r1-l (tuple (i0 u18446744069414584320) (i1 u18446744073709551615) (i2 u13611842547513532036) (i3 u17562291160714782033)))
(define-constant secp256r1-i (tuple (i0 u4611686017353646080) (i1 u4611686018427387904) (i2 u1073741824) (i3 u0)))

(define-constant secp256r1-g {
  x: (tuple (i0 7716867327612699207) (i1 17923454489921339634) (i2 8575836109218198432) (i3 17627433388654248598)),
  y: (tuple (i0 5756518291402817435) (i1 10297457778147434006) (i2 3156516839386865358) (i3 14678990851816772085)),
  z: 1
})

(define-constant secp256r1-point-at-infinity {
  x: u1,
  y: u1,
  z: u0,
})

;; data vars
;;
(define-data-var x uint u0)

(define-constant uint64-max u18446744073709551615)
(define-constant uint64-max-limit u18446744073709551616)

;; data maps
;;

;; public functions
;;

;; (defmethod verify-signature ((key secp256r1-public-key) message signature &key (start 0) end &allow-other-keys)

;;   (let* ((end (min (or end (length message)) (/ +secp256r1-bits+ 8)))
;;          (pk (ec-decode-point :secp256r1 (secp256r1-key-y key)))
;;          (signature-elements (destructure-signature :secp256r1 signature))
;;          (r (ec-decode-scalar :secp256r1 (getf signature-elements :r)))
;;          (s (ec-decode-scalar :secp256r1 (getf signature-elements :s)))
;;          (h (subseq message start end))
;;          (e (ec-decode-scalar :secp256r1 h))
;;          (w (modular-inverse-with-blinding s +secp256r1-l+))
;;          (u1 (mod (* e w) +secp256r1-l+))
;;          (u2 (mod (* r w) +secp256r1-l+))
;;          (rp (ec-add (ec-scalar-mult +secp256r1-g+ u1)
;;                      (ec-scalar-mult pk u2)))
;;          (x (subseq (ec-encode-point rp) 1 (1+ (/ +secp256r1-bits+ 8))))
;;          (v (ec-decode-scalar :secp256r1 x))
;;          (v (mod v +secp256r1-l+)))
;;     (and (< r +secp256r1-l+)
;;          (< s +secp256r1-l+)
;;          (= v r))))

;; @params public-key the Y value of the public key
;; @params Message
;; @params Signature
(define-public (verify-signature  (public-key uint) (message (buff 40)) (signature (buff 40))) 
  (begin 

    ;; I. Check signature length
    (asserts! (is-eq (len signature) (/ secp256r1-bits u4)) (err "Invalid signature length"))

    ;; II. Extract Public Key and Signature Components

    ;; Reconstruct public key

    ;; Extract r and s from signature

    ;; Check r, s is valid

    ;; III. Compute Hash and Scalars
    ;; Convert hash into scalar

    ;; Compute w = s^(-1) mod n (modular inverse of s)

    ;; Compute u1 = (e * w) mod n and u2 = (r * w) mod n

    ;; IV. Compute Elliptic Curve Point

    ;; 1. Compute the point R' = u1 * G + u2 * P
    ;; 1.1. Compute u1 * G
    ;; 1.2. Compute u2 * public-key
    ;; 1.3. Add two points(u1, u2) to get rp = R'.
    ;; 2. Extract X-coordinate and compute v = x mod n
    ;; 2.1. Get the encoded representation of R'.
    ;; 2.2. Extract the X-coordinate.
    ;; 2.3. Convert it to an integer v.

    ;; V. Final Signature Verification

    ;; 1. Check if r and s are within the valid range (< n).
    ;; 2. If v == r, the signature is valid 
    (ok true)
  )
)

;; (define-public (write-message )
;;     (let 
;;       (
;;         (a (unwrap-panic (contract-call? .uint256-lib uint256-add secp256r1-l secp256r1-b)))
;;       )
;;       (print a)
;;       (ok "Message printed")
;; )
;; )
  
;; (define-public ec-scalar-inv ((kind (eql :secp256r1)) n)
;;   (expt-mod n (- +secp256r1-p+ 2) +secp256r1-p+))


;; read only functions
;;

;; private functions
;;
;; (defmethod ec-decode-point ((kind (eql :secp256r1)) octets)
  ;; (case (aref octets 0)
  ;;   ((2 3)
  ;;    ;; Compressed point
  ;;    (if (= (length octets) (1+ (/ +secp256r1-bits+ 8)))
  ;;        (let* ((x-bytes (subseq octets 1 (1+ (/ +secp256r1-bits+ 8))))
  ;;               (x (ec-decode-scalar :secp256r1 x-bytes))
  ;;               (y-sign (- (aref octets 0) 2))
  ;;               (y2 (mod (+ (* x x x) (* -3 x) +secp256r1-b+) +secp256r1-p+))
  ;;               (y (expt-mod y2 +secp256r1-i+ +secp256r1-p+))
  ;;               (y (if (= (logand y 1) y-sign) y (- +secp256r1-p+ y))))
  ;;          (ec-make-point :secp256r1 :x x :y y))
  ;;        (error 'invalid-curve-point :kind 'secp256r1)))
  ;;   ((4)
  ;;    ;; Uncompressed point
  ;;    (if (= (length octets) (1+ (/ +secp256r1-bits+ 4)))
  ;;        (let* ((x-bytes (subseq octets 1 (1+ (/ +secp256r1-bits+ 8))))
  ;;               (x (ec-decode-scalar :secp256r1 x-bytes))
  ;;               (y-bytes (subseq octets (1+ (/ +secp256r1-bits+ 8))))
  ;;               (y (ec-decode-scalar :secp256r1 y-bytes)))
  ;;          (ec-make-point :secp256r1 :x x :y y))
  ;;        (error 'invalid-curve-point :kind 'secp256r1)))
  ;;   (t
  ;;    (error 'invalid-curve-point :kind 'secp256r1))))
(define-private ( ec-decode-point (octets (buff 40))) 
  (let ((first-byte (element-at? octets u0))) 
    (print first-byte) 
    ;; TODO Check first byte
    ;; (if (or (is-eq first-byte 0x2) (is-eq first-byte 3)) (begin (ok true)) (begin (ok false)))

  ;; Compressed point
     (if (is-eq (len octets) (+ u1 (/ secp256r1-bits u8)))
      (let (
          (x-bytes (unwrap!   (slice? octets u1 (+ u1 (/ secp256r1-bits u8))) (err "err")))
          (x-temp (ec-decode-scalar x-bytes))
          (y-sign (- (buff-to-uint-be (unwrap! (element-at? octets u0) (err "err"))) u2))
          ;; (y2 (mod (+ (* x-temp x-temp x-temp) (* -3 x-temp) secp256r1-b) secp256r1-p))
          )
          (ok true)
      )
        ;;  (let* ((x-bytes (subseq octets 1 (1+ (/ +secp256r1-bits+ 8))))
        ;;         (x (ec-decode-scalar :secp256r1 x-bytes))
        ;;         (y-sign (- (aref octets 0) 2))
        ;;         (y2 (mod (+ (* x x x) (* -3 x) +secp256r1-b+) +secp256r1-p+))
        ;;         (y (expt-mod y2 +secp256r1-i+ +secp256r1-p+))
        ;;         (y (if (= (logand y 1) y-sign) y (- +secp256r1-p+ y))))
          ;;  (ec-make-point :secp256r1 :x x :y y))
         (err "invalid curve point"))
  )
)

;; TODO
(define-private (ec-decode-scalar (octest (buff 40))) 1)

