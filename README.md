# 管件查詢圖鑑 Pipe Fittings Reference Chart

純靜態網頁的管件查詢工具（繁體中文、台灣用語），2D 圖鑑牆＋3D 立體檢視：
15 種常用管件＋尺寸標註，切換口徑（1分～6吋）全圖尺寸即時更新。

**🌐 線上直接用（手機/電腦皆可）：https://sancola1219-collab.github.io/pipe-fittings-chart/**
（3D 版：https://sancola1219-collab.github.io/pipe-fittings-chart/3d.html）

## 功能

- 🔍 **2D 近遠看**：滾輪縮放、拖曳平移、雙擊聚焦單一管件
- 🧊 **3D 檢視**：15 個立體模型展示台，拖曳旋轉、雙指/滾輪縮放、點選看說明、自動旋轉
- 📏 **尺寸都在圖上**：對焊管件（彎頭/三通/大小頭/管帽）標 ASME B16.9 實際值，隨口徑切換更新
- 📖 **說明欄**：每個管件的一般叫法（台灣水電俗稱）、用途、常見材質、規範、全口徑尺寸表
- 📋 **管徑對照表**：台制「分」× 英吋 × A 稱呼 × SGP 外徑/厚度/重量 × ASME 外徑
- 無建置步驟、three.js 已內含（lib/），離線也能跑

## 使用

- **線上**：開上面的網址（手機瀏覽器「加入主畫面」就像 App）
- **本機**：2D 直接雙擊 `index.html`；要看 3D 請起本機伺服器
  `python -m http.server 8811` → http://localhost:8811

## 收錄管件

90°彎頭、45°彎頭、正三通、異徑三通、同心/偏心大小頭、管帽、由令、束節、短節（雙頭牙）、
補芯（布司）、管塞、法蘭、四通、內外彎（街彎）

## 資料正確性

所有尺寸數字的來源與驗證日期見 [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md)。
查不到標準值的欄位一律標「依廠牌」，不編造數字。採購前請以廠商型錄為準。

## 開發 / AI 接手

- 人與 Claude：讀 [CLAUDE.md](CLAUDE.md)
- Codex 等其他 AI：讀 [AGENTS.md](AGENTS.md)
- 踩坑筆記：[lessons/](lessons/)
