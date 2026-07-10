# three.js 要用 r147 UMD 版 vendor 進 lib/，別升級也別接 CDN

**為什麼**：r148 之後官方移除了 examples/js（非模組版），OrbitControls 只剩 ES module，
單純 `<script src>` 的零建置架構會掛掉。r147 是最後一個 `THREE.OrbitControls` 掛全域的版本。
vendor 進 repo 則是為了離線可用＋GitHub Pages 不被 CDN 連線問題影響。

**怎麼用**：`lib/three.min.js`＋`lib/OrbitControls.js` 就是 r147，不要動。
若未來真要升級，得整組改成 ES module＋importmap，屬大改，先問過使用者。
