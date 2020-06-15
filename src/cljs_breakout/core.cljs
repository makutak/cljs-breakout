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

(defn draw-ball []
  (.beginPath ctx)
  (.arc ctx x y ball-radius 0 (* Math.PI 2))
  (aset ctx "fillStyle" "#0095DD")
  (.fill ctx)
  (.closePath ctx))

(defn draw []
  (.clearRect ctx 0 0 (. canvas -width) (. canvas -height))
  (draw-ball)
  (if (or (< (+ y dy) ball-radius)
          (> (+ y dy) (- (. canvas -height) ball-radius)))
    (set! dy (- dy)))
  (if (or (< (+ x dx) ball-radius)
          (> (+ x dx) (- (. canvas -width) ball-radius)))
    (set! dx (- dx)))
  (set! x (+ x dx))
  (set! y (+ y dy)))

(js/setInterval draw 10)
