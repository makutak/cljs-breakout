(ns cljs-breakout.core
    (:require ))

(enable-console-print!)

(def canvas (.getElementById js/document "my-canvas"))
(def ctx (.getContext canvas "2d"))

(def x (/ (. canvas -width) 2))
(def y (- (. canvas -height) 30))

(def dx 2)
(def dy -2)

(defn draw []
  (.beginPath ctx)
  (.arc ctx x y 10 0 (* Math.PI 2))
  (aset ctx "fillStyle" "#0095DD")
  (.fill ctx)
  (.closePath ctx)
  (set! x (+ x dx))
  (set! y (+ y dy)))

(js/setInterval draw 10)
