(ns cljs-breakout.core
    (:require ))

(enable-console-print!)

(def canvas (.getElementById js/document "my-canvas"))
(def ctx (.getContext canvas "2d"))

(defn draw []
  (.beginPath ctx)
  (.arc ctx 50 50 10 0 (* Math.PI 2))
  (aset ctx "fillStyle" "#0095DD")
  (.fill ctx)
  (.closePath ctx))

(js/setInterval draw 10)
