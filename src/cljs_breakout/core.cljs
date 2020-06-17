(ns cljs-breakout.core
    (:require ))

(enable-console-print!)

(def canvas (.getElementById js/document "my-canvas"))
(def ctx (.getContext canvas "2d"))

(def x (/ (. canvas -width) 2))
(def y (- (. canvas -height) 30))

(def dx 2)
(def dy -2)

(def ball-radius 10)

(def paddle-height 10)
(def paddle-width 75)
(def paddle-x (-> (. canvas -width) (- paddle-width) (/ 2)))

(def right-pressed false)
(def left-pressed false)

(defn key-down-handler [e]
  (let [pressed (. e -key)]
    (if (or (= "Right" pressed)
            (= "ArrowRight" pressed))
      (set! right-pressed true))
    (if (or (= "Left" pressed)
            (= "ArrowLeft" pressed))
      (set! left-pressed true)))
  (*print-fn* "right-pressed: " right-pressed)
  (*print-fn* "left-pressed: " left-pressed))

(defn key-up-handler [e]
  (let [pressed (. e -key)]
    (if (or (= "Right" pressed)
            (= "ArrowRight" pressed))
      (set! right-pressed false))
    (if (or (= "Left" pressed)
            (= "ArrowLeft" pressed))
      (set! left-pressed false))
    (*print-fn* "right-pressed: " right-pressed)
    (*print-fn* "left-pressed: " left-pressed)))

(defn draw-ball []
  (.beginPath ctx)
  (.arc ctx x y ball-radius 0 (* Math.PI 2))
  (aset ctx "fillStyle" "#0095DD")
  (.fill ctx)
  (.closePath ctx))

(defn draw-paddle []
  (.beginPath ctx)
  (.rect ctx paddle-x (- (. canvas -height) paddle-height) paddle-width paddle-height )
  (aset ctx "fillStyle" "#0095DD")
  (.fill ctx)
  (.closePath ctx))

(defn draw []
  (.clearRect ctx 0 0 (. canvas -width) (. canvas -height))
  (draw-ball)
  (draw-paddle)

  ;; ボール y方向の跳ね返り
  (if (< (+ y dy) ball-radius)
    (set! dy (- dy)))
  (if (> (+ y dy) (- (. canvas -height) ball-radius))
    (if (and (< paddle-x x)
             (< x (+ paddle-x paddle-width)))
      (set! dy (- dy))
      (js/alert "GAME OVER")))
  ;; ボール x方向の跳ね返り
  (if (or (< (+ x dx) ball-radius)
          (> (+ x dx) (- (. canvas -width) ball-radius)))
    (set! dx (- dx)))

  ;; 右が押されたか
  (if (and (true? right-pressed)
           (< paddle-x (-  (. canvas -width ) paddle-width)))
    (do
      (*print-fn* "right pressed!!")
      (set! paddle-x (+ paddle-x 7))))

  ;; 左が押されたか
  (if (and (true? left-pressed)
           (< 0 paddle-x))
    (do
      (*print-fn* "left pressed")
      (set! paddle-x (- paddle-x 7))))

  (set! x (+ x dx))
  (set! y (+ y dy)))

(js/addEventListener "keydown" key-down-handler false)
(js/addEventListener "keyup" key-up-handler false)
(js/setInterval draw 10)
