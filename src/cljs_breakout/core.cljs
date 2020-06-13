(ns cljs-breakout.core
    (:require ))

(enable-console-print!)

(defn init []
  (let [canvas (.getElementById js/document "my-canvas")
        ctx (.getContext canvas "2d")]
    (.beginPath ctx)
    (.rect ctx 20 40 50 50)
    (aset ctx "fillStyle" "#FF0000")
    (.fill ctx)
    (.closePath ctx)))

(init)

