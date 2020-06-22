(ns cljs-breakout.core
    (:require ))

(enable-console-print!)

(def canvas (.getElementById js/document "my-canvas"))
(def ctx (.getContext canvas "2d"))
(def interval)
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

(def brick-row-count 3)
(def brick-column-count 5)
(def brick-width 75)
(def brick-height 20)
(def brick-padding 10)
(def brick-offset-top 30)
(def brick-offset-left 30)

(def bricks (clj->js []))

;; loop 使う？
(dotimes [c brick-column-count]
  (aset bricks c (clj->js []))
  (dotimes [r brick-row-count]
    (aset bricks c r (clj->js {:x 0 :y 0 :status 1}))))

(defn key-down-handler [e]
  (let [pressed (. e -key)]
    (if (or (= "Right" pressed)
            (= "ArrowRight" pressed))
      (set! right-pressed true))
    (if (or (= "Left" pressed)
            (= "ArrowLeft" pressed))
      (set! left-pressed true))))

(defn key-up-handler [e]
  (let [pressed (. e -key)]
    (if (or (= "Right" pressed)
            (= "ArrowRight" pressed))
      (set! right-pressed false))
    (if (or (= "Left" pressed)
            (= "ArrowLeft" pressed))
      (set! left-pressed false))))

(defn collision-detection []
  (dotimes [r brick-row-count]
    (dotimes [c brick-column-count]
      (let [b (aget bricks c r)]
        (if (= (.-status b) 1)
          (if (and (> x (.-x b))
                   (> y (.-y b))
                   (> (+ (.-x b) brick-width) x)
                   (> (+ (.-y b) brick-height) y))
            (do
              (set! dy (- dy))
              (aset bricks c r "status" 0))))))))


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

(defn draw-bricks []
  (dotimes [c brick-column-count]
    (dotimes [r brick-row-count]
      (if (= (aget bricks c r "status") 1)
        (let [brick-x (+ (* c (+ brick-width brick-padding)) brick-offset-left)
              brick-y (+ (* r (+ brick-height brick-padding)) brick-offset-top)]
          (aset bricks c r "x" brick-x)
          (aset bricks c r "y" brick-y)
          (.beginPath ctx)
          (.rect ctx brick-x brick-y brick-width brick-height)
          (aset ctx "fillStyle" "#0095DD")
          (.fill ctx)
          (.closePath ctx))))))

(defn draw []
  (.clearRect ctx 0 0 (. canvas -width) (. canvas -height))
  (draw-bricks)
  (draw-ball)
  (draw-paddle)
  (collision-detection)

  ;; ボール y方向の跳ね返り
  (if (< (+ y dy) ball-radius)
    (set! dy (- dy)))
  (if (> (+ y dy) (- (. canvas -height) ball-radius))
    (if (and (< paddle-x x)
             (< x (+ paddle-x paddle-width)))
      (set! dy (- (+ dy 0.5)))
      (do
        (js/alert "GAME OVER")
        (.reload js/window.location)
        (js/clearInterval interval))))

  ;; ボール x方向の跳ね返り
  (if (or (< (+ x dx) ball-radius)
          (> (+ x dx) (- (. canvas -width) ball-radius)))
    (set! dx (- dx)))

  ;; 右が押されたか
  (if (and (true? right-pressed)
           (< paddle-x (-  (. canvas -width ) paddle-width)))
    (set! paddle-x (+ paddle-x 7)))

  ;; 左が押されたか
  (if (and (true? left-pressed)
           (< 0 paddle-x))
    (set! paddle-x (- paddle-x 7)))

  (set! x (+ x dx))
  (set! y (+ y dy)))

(js/addEventListener "keydown" key-down-handler false)
(js/addEventListener "keyup" key-up-handler false)
(set! interval (js/setInterval draw 10))
