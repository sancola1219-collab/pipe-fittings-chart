# 3D 用自寫軟體渲染（canvas 2D），不要用 three.js

**為什麼**：three.js 綁 r147 版本才有非模組的 OrbitControls，升級就壞、又要 vendor 600KB 進 repo，
且部分內嵌環境 requestAnimationFrame 不觸發。改用「螺牙查詢」專案已驗證的做法——
**純 canvas 2D 的軟體渲染（painter's algorithm）**：把管件建成 quad 網格，每格算法線光照、
依平均 z 由遠到近畫（`3d.html` 的 `render()`）。零依賴、離線可跑、不怕版本問題，且和螺牙查詢視覺一致。

**關鍵細節**：
- 用 `setInterval(tick,33)` 不用 rAF（部分背景/內嵌環境 rAF 不跑）。
- 光照：單一方向光 `[-0.32,-0.5,-0.8]`，法線一律翻向觀察者（n.z>0 就反號），免管正反面。
- 每格只 `fill()`，**不要再 `stroke()`**（描邊會讓幀時間翻倍，螺牙件會卡）。
- 面數大戶是螺紋：`thread()` 用自己較低的圓周解析度 TSEG=28、軸向 NZ 上限 46，
  單一螺牙件壓在 ~3000 面、單幀 <25ms，手機才順。

**怎麼用**：新增管件＝在 `BUILD` 加一個建網格的函式（回傳 info 字串、把 annotation push 進 mesh）。
不要為了「更漂亮」改回 three.js——這套已足夠且更穩。相關：[[true-scale-and-annotations]]
