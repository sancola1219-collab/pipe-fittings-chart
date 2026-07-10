# 資料來源（全部查證日：2026-07-10）

改任何數字前先看這裡；新增數字必須在這裡補來源。

## 1. SGP 鋼管尺寸（`SIZES` 的 od / t / kg 欄）

- 標準：JIS G3452（= CNS 6445 配管用碳鋼鋼管，台灣一般給水/氣體/消防用管）
- 來源：JIS G3452 標準原文 Table 5「Dimensions, Weights and Dimensional Tolerances」
  （TubeSolution 轉載 PDF：https://www.tubesolution.com/standard/JIS/JIS%20G3452.pdf）
- 涵蓋：6A(1/8")～150A(6")，外徑 10.5～165.2mm、厚度、每米重量

## 2. ASME 鋼管外徑（`SIZES` 的 aod 欄）

- 標準：ASME B36.10 標準外徑（對焊管件搭配用）
- 1/2"~6" 由 B16.9 管件表的 OD 欄交叉確認（下列來源同）；1/8"~3/8"（10.3/13.7/17.1）為
  B36.10 公示值，未另行逐一驗證 —— 若要用於採購請再確認

## 3. ASME B16.9 對焊管件尺寸（`SIZES` 的 bw 陣列）

`bw = [90°彎頭A, 45°彎頭B, 三通C(=M), 大小頭H, 管帽E]`，單位 mm，範圍 1/2"～6"

| 尺寸 | 來源 |
|------|------|
| 90° LR 彎頭 A、45° 彎頭 B | https://www.wermac.org/fittings/dim_elbows_a.html |
| 正三通 C / M | https://www.ferrobend.com/dimensions/ansi-asme/pipe-fitting/b16.9-straight-tee/ |
| 同心/偏心大小頭 H | https://www.wermac.org/fittings/dim_reducers.html |
| 管帽 E | https://www.wermac.org/fittings/dim_caps.html |

- B16.9 從 1/2" 起，1/8"~3/8" 無對焊標準值 → `bw:null`，UI 顯示「—」
- 5"/6" 的值也一併收錄（190/229 等），目前 UI 有列

## 4. 故意不給數值的欄位

| 項目 | 原因 |
|------|------|
| 牙口管件（由令/束節/短節/補芯/管塞/內外彎）的長度 | 無統一標準，各廠牌型錄不同，只標牙規（PT/R/Rp） |
| 異徑三通支管 M | 依「主×主×支」組合而異，組合太多 |
| 法蘭外徑/PCD/孔數 | 依壓力等級（JIS 10K / ASME Class150）不同，需先定等級再查表 |

## 5. 俗稱（alias 欄）

台灣水電行口語叫法（多源自日文音譯：エルボ→L仔、ユニオン→由令、ブッシング→布信…），
屬常識性整理、地區可能略異，非標準名詞 —— 有更在地的叫法可直接補進 `alias` 陣列。
