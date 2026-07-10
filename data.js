/* ═══════════════════════════════════════════════════════════════
   共用資料（index.html 2D 圖鑑與 3d.html 3D 檢視共用）
   全部尺寸均查證於 2026-07-10，來源見 docs/DATA-SOURCES.md
   ─ SGP 鋼管：JIS G3452 Table 5（= CNS 6445）
   ─ 對焊管件：ASME B16.9（1/2"~6"，小於 1/2" 無對焊標準 → null）
═══════════════════════════════════════════════════════════════ */
const SIZES = [
  // key, A稱呼, B稱呼, 台制, SGP外徑, SGP厚, 重量kg/m, ASME外徑, B16.9:[90°A, 45°B, 三通C, 大小頭H, 管帽E]
  {key:'1/8',  a:'6A',   b:'1/8"',   fen:'1分',   od:10.5,  t:2.0, kg:0.419, aod:10.3,  bw:null},
  {key:'1/4',  a:'8A',   b:'1/4"',   fen:'2分',   od:13.8,  t:2.3, kg:0.664, aod:13.7,  bw:null},
  {key:'3/8',  a:'10A',  b:'3/8"',   fen:'3分',   od:17.3,  t:2.3, kg:0.866, aod:17.1,  bw:null},
  {key:'1/2',  a:'15A',  b:'1/2"',   fen:'4分',   od:21.7,  t:2.8, kg:1.25,  aod:21.3,  bw:[38,16,25,38,25]},
  {key:'3/4',  a:'20A',  b:'3/4"',   fen:'6分',   od:27.2,  t:2.8, kg:1.60,  aod:26.7,  bw:[38,19,29,38,25]},
  {key:'1',    a:'25A',  b:'1"',     fen:'1吋',   od:34.0,  t:3.2, kg:2.45,  aod:33.4,  bw:[38,22,38,51,38]},
  {key:'1-1/4',a:'32A',  b:'1-1/4"', fen:'1吋2',  od:42.7,  t:3.5, kg:3.16,  aod:42.2,  bw:[48,25,48,51,38]},
  {key:'1-1/2',a:'40A',  b:'1-1/2"', fen:'1吋半', od:48.6,  t:3.5, kg:3.63,  aod:48.3,  bw:[57,29,57,64,38]},
  {key:'2',    a:'50A',  b:'2"',     fen:'2吋',   od:60.5,  t:3.8, kg:5.12,  aod:60.3,  bw:[76,35,64,76,38]},
  {key:'2-1/2',a:'65A',  b:'2-1/2"', fen:'2吋半', od:76.3,  t:4.2, kg:6.34,  aod:73.0,  bw:[95,44,76,89,38]},
  {key:'3',    a:'80A',  b:'3"',     fen:'3吋',   od:89.1,  t:4.2, kg:8.49,  aod:88.9,  bw:[114,51,86,89,51]},
  {key:'4',    a:'100A', b:'4"',     fen:'4吋',   od:114.3, t:4.5, kg:12.2,  aod:114.3, bw:[152,64,105,102,64]},
  {key:'5',    a:'125A', b:'5"',     fen:'5吋',   od:139.8, t:4.5, kg:16.1,  aod:141.3, bw:[190,79,124,127,76]},
  {key:'6',    a:'150A', b:'6"',     fen:'6吋',   od:165.2, t:5.0, kg:19.2,  aod:168.3, bw:[229,95,143,140,89]},
];
const BW = {ELBOW90:0, ELBOW45:1, TEE:2, REDUCER:3, CAP:4};

const MAT = {
  malleable:'瑪鋼（可鍛鑄鐵，鍍鋅／黑），牙口 CNS 2472／ASME B16.3',
  carbon:'碳鋼 A234 WPB（對焊，ASME B16.9）',
  ss:'不鏽鋼 SUS304／SUS316（對焊、牙口、壓接都有）',
  pvc:'PVC（CNS 4053，南亞等，給水／排水用）',
  brass:'青銅／黃銅（水表週邊、熱水系統）',
  press:'不鏽鋼壓接式（Press fit，自來水常用）',
};

/* 每個管件：id、名稱、英文、一般叫法（俗稱）、用途、材質、標準、尺寸表定義 */
const FITTINGS = [
  {
    id:'elbow90', name:'90°彎頭', en:'90° Elbow (Long Radius)',
    alias:['90度L','彎頭','エルボ（台語：L仔）'],
    usage:'改變管路方向 90°。長半徑（LR）彎曲半徑＝1.5 倍口徑，阻力小，是配管最常用的方向轉換管件。',
    mats:[MAT.carbon, MAT.ss, MAT.malleable, MAT.pvc, MAT.press],
    std:'對焊：ASME B16.9｜牙口：CNS 2472 / ASME B16.3',
    dimCols:['A 中心至端面'],
    dimGet:s=>s.bw?[s.bw[BW.ELBOW90]]:null,
    note:'A＝中心至端面距離（mm）。牙口彎頭尺寸依各廠牌型錄，此表為對焊 LR 彎頭。',
  },
  {
    id:'elbow45', name:'45°彎頭', en:'45° Elbow',
    alias:['45度L','斜彎'],
    usage:'改變管路方向 45°。兩支 45° 可取代一支 90° 減少壓損；排水配管閃避樑柱常用。',
    mats:[MAT.carbon, MAT.ss, MAT.malleable, MAT.pvc],
    std:'對焊：ASME B16.9｜牙口：CNS 2472 / ASME B16.3',
    dimCols:['B 中心至端面'],
    dimGet:s=>s.bw?[s.bw[BW.ELBOW45]]:null,
    note:'B＝中心至端面距離（mm），對焊 LR 45° 彎頭。',
  },
  {
    id:'tee', name:'三通（正三通）', en:'Equal Tee',
    alias:['T仔','正T','チーズ'],
    usage:'管路分歧出一支垂直支管，三口同徑。給水分歧、消防立管分層最常用。',
    mats:[MAT.carbon, MAT.ss, MAT.malleable, MAT.pvc, MAT.press],
    std:'對焊：ASME B16.9｜牙口：CNS 2472 / ASME B16.3',
    dimCols:['C 中心至管端','M 中心至支管端'],
    dimGet:s=>s.bw?[s.bw[BW.TEE], s.bw[BW.TEE]]:null,
    note:'正三通 C＝M。對焊尺寸如表；牙口依廠牌。',
  },
  {
    id:'rtee', name:'異徑三通', en:'Reducing Tee',
    alias:['RT','大小T','異徑T'],
    usage:'分歧支管口徑比主管小，例：2"×2"×1"。主管尺寸照走、支管縮小接分路。',
    mats:[MAT.carbon, MAT.ss, MAT.malleable, MAT.pvc],
    std:'對焊：ASME B16.9｜牙口：CNS 2472 / ASME B16.3',
    dimCols:['C 中心至管端（同正三通）'],
    dimGet:s=>s.bw?[s.bw[BW.TEE]]:null,
    note:'主管 C 與正三通相同；支管 M 依「主×主×支」組合而異，叫料須講三個口徑，詳廠商型錄。',
  },
  {
    id:'creducer', name:'同心大小頭', en:'Concentric Reducer',
    alias:['大小頭','R','異徑管','レジューサ'],
    usage:'兩端不同口徑、中心線對齊。立管變徑、泵浦出口變徑用。',
    mats:[MAT.carbon, MAT.ss, MAT.pvc],
    std:'對焊：ASME B16.9',
    dimCols:['H 全長'],
    dimGet:s=>s.bw?[s.bw[BW.REDUCER]]:null,
    note:'H＝端面至端面全長（mm），依「大端」口徑查表。牙口變徑用補芯（bushing）或異徑束節。',
  },
  {
    id:'ereducer', name:'偏心大小頭', en:'Eccentric Reducer',
    alias:['偏心R','ER'],
    usage:'兩端不同口徑、一側管壁齊平。水平管線變徑保持管底（或管頂）水平，泵浦吸入端防積氣必用。',
    mats:[MAT.carbon, MAT.ss],
    std:'對焊：ASME B16.9',
    dimCols:['H 全長（同同心）'],
    dimGet:s=>s.bw?[s.bw[BW.REDUCER]]:null,
    note:'H 與同心大小頭相同。安裝方向：吸入端平頂（防氣袋）、蒸汽管平底（防水鎚）。',
  },
  {
    id:'cap', name:'管帽', en:'Cap',
    alias:['CAP','封頭','管尾蓋'],
    usage:'封閉管末端。對焊蓋為橢圓形封頭；牙口內牙蓋直接鎖在管牙上。',
    mats:[MAT.carbon, MAT.ss, MAT.malleable, MAT.pvc],
    std:'對焊：ASME B16.9｜牙口：CNS 2472 / ASME B16.3',
    dimCols:['E 全長'],
    dimGet:s=>s.bw?[s.bw[BW.CAP]]:null,
    note:'E＝端面至頂點長（mm），對焊管帽。',
  },
  {
    id:'union', name:'由令', en:'Union',
    alias:['由任','活接頭','ユニオン'],
    usage:'可拆式接頭：中間螺帽鬆開即可分離管路，不必轉動管子。設備（泵、熱水器、水表）前後必裝，方便日後維修拆換。',
    mats:[MAT.malleable, MAT.ss, MAT.brass, MAT.pvc],
    std:'牙口：CNS 2472 / ASME B16.39',
    dimCols:['牙規 PT'],
    dimGet:s=>[`PT ${s.b}`],
    note:'全長依廠牌（無統一標準值）。密合面有平面／錐面／O 環三種，舊管換修要對型式。',
  },
  {
    id:'coupling', name:'束節（管接頭）', en:'Coupling / Socket',
    alias:['S接','束尼','直接頭','ソケット'],
    usage:'兩支同徑管子對接延長。內牙×內牙，最基本的直線接續管件。',
    mats:[MAT.malleable, MAT.ss, MAT.brass, MAT.pvc, MAT.press],
    std:'牙口：CNS 2472 / ASME B16.3',
    dimCols:['牙規 PT'],
    dimGet:s=>[`PT ${s.b}`],
    note:'另有「異徑束節」兩端不同口徑。長度依廠牌型錄。',
  },
  {
    id:'nipple', name:'短節（雙頭牙）', en:'Nipple',
    alias:['尼股','泥鰍','雙頭外牙','ニップル'],
    usage:'兩端外牙的短管，連接兩個內牙管件（如束節×水閥）。長度常見 40～150mm 或訂製。',
    mats:[MAT.malleable, MAT.ss, MAT.brass],
    std:'CNS 4165 / JIS B2302，管體用 SGP 管',
    dimCols:['外徑 ØD（SGP）'],
    dimGet:s=>[s.od],
    note:'全長 L 叫料時指定（例：4分×100mm 長）。全牙短節俗稱「全牙」。',
  },
  {
    id:'bushing', name:'補芯（布司）', en:'Bushing',
    alias:['布信','大小補芯','ブッシング'],
    usage:'外牙大×內牙小的縮徑件，直接鎖進大管件內牙把口徑縮小，例：1" 三通支口縮成 4 分接感知器。',
    mats:[MAT.malleable, MAT.ss, MAT.brass],
    std:'牙口：CNS 2472 / ASME B16.14',
    dimCols:['外牙 R','內牙 Rp（縮一級示例）'],
    dimGet:(s,i)=>[`R ${s.b}`, i>0?`Rp ${SIZES[i-1].b}`:'—'],
    note:'叫料講「大×小」兩口徑，例：6分×4分補芯。',
  },
  {
    id:'plug', name:'管塞', en:'Plug',
    alias:['不拉古','堵頭','塞頭','プラグ'],
    usage:'外牙塞頭，鎖進內牙管口封閉，如三通預留口、排水頭。頭部有四角／六角／內六角。',
    mats:[MAT.malleable, MAT.ss, MAT.brass, MAT.pvc],
    std:'牙口：CNS 2472 / ASME B16.14',
    dimCols:['牙規 R'],
    dimGet:s=>[`R ${s.b}`],
    note:'與管帽相反：管塞是外牙塞「進去」，管帽是內牙蓋「上去」。',
  },
  {
    id:'flange', name:'法蘭', en:'Flange',
    alias:['凸緣','法蘭盤','フランジ'],
    usage:'管端焊上（或牙上）法蘭盤，兩盤夾墊片鎖螺栓成可拆接頭。閥類、設備接口、大口徑管路標配。',
    mats:[MAT.carbon, MAT.ss],
    std:'JIS B2220（10K，台灣最常用）／ASME B16.5（Class 150）',
    dimCols:['配管外徑 ØD（SGP）'],
    dimGet:s=>[s.od],
    note:'法蘭外徑、螺栓孔數與 PCD 依壓力等級（10K／Class150）不同，叫料要先講等級，再查該等級尺寸表。型式有滑入焊（SO）、對焊頸（WN）、牙口、盲板（BL）。',
  },
  {
    id:'cross', name:'四通', en:'Cross',
    alias:['十字','四路'],
    usage:'四口同徑十字分歧。消防、灑水系統較常見；一般給水多用兩個三通取代。',
    mats:[MAT.carbon, MAT.ss, MAT.malleable],
    std:'對焊：ASME B16.9｜牙口：CNS 2472 / ASME B16.3',
    dimCols:['C 中心至端面（同三通）'],
    dimGet:s=>s.bw?[s.bw[BW.TEE]]:null,
    note:'對焊四通 C 尺寸與正三通相同。',
  },
  {
    id:'stelbow', name:'內外彎（街彎）', en:'Street Elbow',
    alias:['內外牙彎頭','公母彎'],
    usage:'一端外牙、一端內牙的 90° 彎頭，可直接鎖進另一管件省一支短節，狹小空間轉向好用。',
    mats:[MAT.malleable, MAT.ss, MAT.brass, MAT.pvc],
    std:'牙口：CNS 2472 / ASME B16.3',
    dimCols:['牙規 R×Rp'],
    dimGet:s=>[`R×Rp ${s.b}`],
    note:'也有 45° 內外彎。長度依廠牌。',
  },
];

const fmt = v => v==null ? '—' : (typeof v==='number'? v+'' : v);

/* 說明欄 HTML（2D／3D 共用） */
function panelHTML(f, selSize){
  const rows = SIZES.map((s,i)=>{
    const vals = f.dimGet(s,i);
    const cells = f.dimCols.map((_,j)=>`<td>${vals?fmt(vals[j]):'—'}</td>`).join('');
    return `<tr class="${s.key===selSize.key?'hl':''}">
      <td>${s.fen}</td><td>${s.b}</td><td>${s.a}</td><td>${s.od}</td>${cells}</tr>`;
  }).join('');
  return `
    <h2>${f.name}</h2>
    <div class="en">${f.en}</div>
    <div class="infoRow"><b>一般叫法</b>${f.alias.map(a=>`<span class="tag">${a}</span>`).join('')}</div>
    <div class="infoRow"><b>用途</b>${f.usage}</div>
    <div class="infoRow"><b>常見材質</b><br>${f.mats.map(m=>`・${m}`).join('<br>')}</div>
    <div class="infoRow"><b>規範</b>${f.std}</div>
    <table>
      <tr><th>台制</th><th>吋</th><th>A</th><th>SGP外徑</th>${f.dimCols.map(c=>`<th>${c}</th>`).join('')}</tr>
      ${rows}
    </table>
    <p class="note">${f.note}</p>
    <p class="note">「—」＝該口徑無此標準值（ASME B16.9 對焊管件自 1/2" 起）。資料查證日 2026-07-10，來源見 docs/DATA-SOURCES.md。</p>`;
}
