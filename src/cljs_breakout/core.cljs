(ns cljs-breakout.core
    (:require ))

(enable-console-print!)

(def canvas)
(def ctx)

(defn create-square []
  (.beginPath ctx)
  (.rect ctx 20 40 50 50)
  (aset ctx "fillStyle" "#FF0000")
  (.fill ctx)
  (.closePath ctx))

(defn create-circle []
  (.beginPath ctx)
  (.arc ctx 240 160 20 0 (* Math.PI 2) false)
  (aset ctx "fillStyle" "green")
  (.fill ctx)
  (.closePath ctx))

(defn init []
  (let [canvas (.getElementById js/document "my-canvas")]
    (set! ctx (.getContext canvas "2d"))
    (create-square)
    (create-circle)))


(init)
