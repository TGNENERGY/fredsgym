<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
<meta name="theme-color" content="#12160F" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="FredsGym" />
<link rel="manifest" href="manifest.webmanifest" />
<link rel="apple-touch-icon" href="icons/icon-180.png" />
<title>FredsGym</title>
<style>
  :root{
    --bg:#12160F; --panel:#1B2114; --panel2:#222b17;
    --olive:#4A5A2B; --oliveL:#6B8036; --sand:#C7BFA4;
    --work:#8FB63C; --rest:#3D6E8C; --prep:#B8912E; --ink:#E6E4D6; --faint:#7C8168;
  }
  *{box-sizing:border-box; -webkit-tap-highlight-color:transparent;}
  html,body{margin:0; padding:0; background:var(--bg); color:var(--ink);
    font-family:ui-monospace,'SF Mono',Menlo,Consolas,monospace; overscroll-behavior:none;}
  body{min-height:100vh; min-height:100dvh; user-select:none;}
  .wrap{max-width:460px; margin:0 auto; padding:calc(env(safe-area-inset-top) + 14px) 16px calc(env(safe-area-inset-bottom) + 28px);}
  .eyebrow{font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--faint);}
  h1{font-size:20px; letter-spacing:5px; margin:2px 0 0; color:var(--sand); text-transform:uppercase;}
  .accentG{color:var(--work);}
  .row{display:flex; gap:8px;}
  .seg{display:flex; gap:6px; background:#000; border:1px solid var(--olive); border-radius:10px; padding:4px;}
  .seg button{flex:1; background:transparent; color:var(--faint); border:none; border-radius:7px;
    padding:9px 6px; font:inherit; font-size:12px; letter-spacing:1px; cursor:pointer; text-transform:uppercase;}
  .seg button.on{background:var(--olive); color:var(--ink);}
  .card{background:var(--panel); border:1px solid var(--olive); border-radius:14px; padding:16px; margin-top:14px;}
  .label{font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--faint); margin-bottom:8px;}
  .dial-wrap{position:relative; width:290px; height:290px; margin:6px auto 0;}
  .dial-center{position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;}
  .phase{font-size:11px; letter-spacing:3px; text-transform:uppercase; font-weight:700;}
  .time{font-size:62px; font-weight:700; line-height:1.05;}
  .exname{font-size:15px; text-align:center; color:var(--sand); max-width:210px; min-height:38px; padding:0 6px;}
  .cue{font-size:11.5px; color:var(--faint); text-align:center; max-width:300px; margin:10px auto 0; min-height:30px; line-height:1.4;}
  .next{font-size:11px; text-align:center; color:var(--faint); letter-spacing:1px; text-transform:uppercase; margin-top:8px; min-height:16px;}
  .controls{display:flex; gap:10px; align-items:center; justify-content:center; margin-top:16px;}
  .btn{background:transparent; color:var(--sand); border:1px solid var(--olive); border-radius:9px;
    padding:11px 14px; font:inherit; font-size:13px; letter-spacing:1px; cursor:pointer;}
  .btn:active{transform:translateY(1px);}
  .btn-main{border:none; color:#0d0f0a; border-radius:11px; padding:16px 30px; font-size:17px;
    font-weight:700; letter-spacing:1px; min-width:150px; box-shadow:0 4px 0 rgba(0,0,0,.4); cursor:pointer;}
  .btn-main:active{transform:translateY(2px); box-shadow:0 2px 0 rgba(0,0,0,.4);}
  .var-row{display:flex; gap:6px; margin-top:10px;}
  .var-row button{flex:1; background:#000; border:1px solid var(--olive); color:var(--faint);
    border-radius:8px; padding:8px 4px; font:inherit; font-size:11px; letter-spacing:.5px; cursor:pointer; text-transform:uppercase;}
  .var-row button.on{background:var(--oliveL); color:#0d0f0a; border-color:var(--oliveL); font-weight:700;}
  .list{margin-top:6px;}
  .list-item{display:flex; justify-content:space-between; align-items:center; padding:9px 4px;
    border-bottom:1px solid #2a3320; font-size:13px;}
  .list-item:last-child{border-bottom:none;}
  .list-item .n{color:var(--sand);}
  .list-item .s{color:var(--faint); font-size:11px;}
  .list-item.active{background:#2a3320; border-radius:8px; padding-left:8px; padding-right:8px;}
  .bar{width:100%; height:6px; background:#000; border:1px solid var(--olive); border-radius:3px; overflow:hidden; margin-top:12px;}
  .bar > div{height:100%; background:linear-gradient(90deg,var(--oliveL),var(--work)); transition:width .4s linear;}
  .foot{margin-top:16px; font-size:11px; color:var(--faint); letter-spacing:1.5px; text-transform:uppercase; text-align:center;}
  .install{margin-top:14px; font-size:12px; color:var(--faint); text-align:center; line-height:1.5;}
  .install b{color:var(--sand);}
  #installBtn{margin-top:8px;}
  /* landscape lock overlay */
  #rotate{position:fixed; inset:0; background:var(--bg); z-index:999; display:none;
    flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:24px;}
  #rotate .ico{font-size:52px; margin-bottom:16px;}
  @media (orientation:landscape) and (max-height:520px){ #rotate{display:flex;} }
  .streak{color:var(--work); font-weight:700;}
</style>
</head>
<body>
<div id="rotate">
  <div class="ico">📱↻</div>
  <div style="letter-spacing:2px; text-transform:uppercase; color:var(--sand); font-size:14px;">Rotate to portrait</div>
  <div style="color:var(--faint); font-size:12px; margin-top:8px;">FredsGym runs upright.</div>
</div>

<div class="wrap">
  <div class="row" style="justify-content:space-between; align-items:baseline;">
    <div>
      <div class="eyebrow" id="weekday">Daily rotation</div>
      <h1>FREDS<span class="accentG">GYM</span></h1>
    </div>
    <div style="text-align:right;">
      <div class="eyebrow">Streak</div>
      <div class="streak" id="streak">0🔥</div>
    </div>
  </div>

  <!-- Day selector -->
  <div class="card">
    <div class="label">Today's focus</div>
    <div class="seg" id="daySeg"></div>
    <div class="row" style="margin-top:10px; gap:8px;">
      <div class="seg" id="lenSeg" style="flex:1;">
        <button data-len="15">15 min</button>
        <button data-len="30">30 min</button>
      </div>
      <div class="seg" id="weekSeg" style="flex:2;">
        <button data-week="1">Wk 1</button>
        <button data-week="2">Wk 2</button>
        <button data-week="3">Wk 3</button>
        <button data-week="4">Wk 4</button>
      </div>
    </div>
    <div class="cue" id="dayDesc" style="text-align:left; max-width:none; margin-top:12px;"></div>
  </div>

  <!-- Timer -->
  <div class="card">
    <div class="bar"><div id="overall"></div></div>
    <div class="dial-wrap">
      <svg width="290" height="290" viewBox="0 0 290 290">
        <circle cx="145" cy="145" r="126" fill="none" stroke="#000" stroke-width="17" opacity=".5"/>
        <circle id="ring" cx="145" cy="145" r="126" fill="none" stroke="var(--work)" stroke-width="17"
          stroke-linecap="round" transform="rotate(-90 145 145)"/>
      </svg>
      <div class="dial-center">
        <div class="phase" id="phase">Standby</div>
        <div class="time" id="time">0:10</div>
        <div class="exname" id="exname">Get ready</div>
      </div>
    </div>
    <div class="cue" id="cue"></div>
    <div class="next" id="next"></div>

    <!-- variation picker -->
    <div class="label" style="margin-top:14px;">Variation (tap to scale)</div>
    <div class="var-row" id="varRow">
      <button data-v="0">Easier</button>
      <button data-v="1">Standard</button>
      <button data-v="2">Harder</button>
    </div>

    <div class="controls">
      <button class="btn" id="prev">‹ Prev</button>
      <button class="btn-main" id="startBtn">▶ Start</button>
      <button class="btn" id="skip">Skip ›</button>
    </div>
    <div class="row" style="justify-content:center; margin-top:10px;">
      <button class="btn" id="reset" style="opacity:.8;">↺ Reset</button>
    </div>
    <div class="foot" id="foot"></div>
  </div>

  <!-- Session list -->
  <div class="card">
    <div class="label">Session plan</div>
    <div class="list" id="planList"></div>
  </div>

  <!-- Install -->
  <div class="card">
    <div class="label">Save to home screen</div>
    <div class="install" id="installTxt">
      <b>iPhone:</b> Share → <b>Add to Home Screen</b>.<br>
      <b>Android:</b> ⋮ menu → <b>Install app</b> / Add to Home screen.
    </div>
    <button class="btn-main" id="installBtn" style="display:none; width:100%; background:var(--work);">⬇ Install FredsGym</button>
  </div>
</div>

<script>
/* ============ PROGRAM DATA ============ */
/* Each exercise: variations [easier, standard, harder], cue, and whether time- or rep-based.
   For a timer app everything is time-based; reps shown in the cue. */
const EX = {
  // PUSH
  pushup:   {v:["Incline push-ups","Push-ups","Diamond push-ups"], cue:"Elbows ~45°, body one line, full lockout."},
  pike:     {v:["Pike push-ups (high hips)","Pike push-ups","Feet-elevated pike"], cue:"Shoulder press pattern — head between hands."},
  dips:     {v:["Bench dips (bent legs)","Bench/chair dips","Straight-leg bench dips"], cue:"Chest tall, lower to 90° elbow."},
  archer:   {v:["Wide push-ups","Uneven push-ups","Archer push-ups"], cue:"Shift weight to working arm."},
  // LEGS
  squat:    {v:["Assisted squats","Air squats","Squat jumps"], cue:"Knees track toes, sit back, drive through heels."},
  split:    {v:["Split squat","Reverse lunge","Bulgarian split squat"], cue:"Front shin vertical, control the descent."},
  glute:    {v:["Glute bridge","Single-leg glute bridge","Elevated single-leg bridge"], cue:"Squeeze glutes at top, ribs down."},
  calf:     {v:["Two-leg calf raise","Single-leg calf raise","Deficit single-leg raise"], cue:"Full range, pause at top — protects your runner ankles."},
  hamstr:   {v:["Good mornings (bodyweight)","Single-leg RDL","Slider leg curl"], cue:"Hinge at hips, flat back, feel hamstrings."},
  // PULL / BACK
  row:      {v:["Doorframe rows (upright)","Table/towel rows","Feet-elevated rows"], cue:"Pull elbows back, squeeze shoulder blades."},
  superman: {v:["Superman hold","Superman raises","W-raises + hold"], cue:"Lift chest & thighs, long neck — fixes running posture."},
  reverse:  {v:["Wall angels","Reverse snow angels","Prone Y-T-W"], cue:"Slow, squeeze upper back."},
  // CORE
  plank:    {v:["Knee plank","Forearm plank","RKC/hardstyle plank"], cue:"Squeeze everything, no sag."},
  deadbug:  {v:["Dead bug (arms only)","Dead bug","Weighted-tempo dead bug"], cue:"Low back pinned to floor throughout."},
  hollow:   {v:["Tuck hold","Hollow hold","Hollow rocks"], cue:"Lower back glued down, ribs in."},
  sideplank:{v:["Knee side plank","Side plank","Side plank + reach"], cue:"Stack hips, straight line — anti-rotation for runners."},
  bicycle:  {v:["Slow bicycle","Bicycle crunches","Extended bicycle"], cue:"Rotate through the torso, not the neck."},
  flutter:  {v:["Flutter (bent knee)","Flutter kicks","Straight-leg flutter"], cue:"Small fast kicks, low back down."},
  // POWER / FULL
  burpee:   {v:["Step-back burpee","Burpee","Burpee + tuck jump"], cue:"Explode up, soft landing."},
  climber:  {v:["Slow mountain climbers","Mountain climbers","Cross-body climbers"], cue:"Hips level, quick knees."},
  jack:     {v:["Step jacks","Jumping jacks","Star jumps"], cue:"Stay light on the feet."},
  skater:   {v:["Lateral steps","Skater hops","Skater + reach"], cue:"Single-leg landing control."},
  // MOBILITY / RECOVERY
  worldg:   {v:["World's greatest stretch","World's greatest stretch","+ thoracic reach"], cue:"Open hips & T-spine — runner's best friend."},
  hipflex:  {v:["Kneeling hip flexor stretch","Couch stretch (light)","Couch stretch"], cue:"Tuck pelvis, tall chest — counters running tightness."},
  pigeon:   {v:["Figure-4 (on back)","Pigeon pose","Deep pigeon"], cue:"Breathe into the glute."},
  catcow:   {v:["Cat-cow","Cat-cow","Cat-cow + reach"], cue:"Move with breath, full spine."},
  hamstretch:{v:["Standing hamstring reach","Seated hamstring stretch","Jefferson curl (light)"], cue:"Hinge, don't round hard."},
  ankle:    {v:["Ankle circles","Wall ankle rocks","Weighted ankle rocks"], cue:"Knee over toes, heel down — running durability."},
  breathe:  {v:["Box breathing","Diaphragm breathing","Extended exhale"], cue:"Down-regulate. In 4, out 6."},
};

/* 7-day rotation. Each day is a list of exercise keys.
   The timer builds work/rest intervals from these based on session length. */
const DAYS = [
  {key:"push", name:"Push", desc:"Chest, shoulders, triceps + core. Pairs well with a rest-from-running day.",
   ex:["jack","pushup","pike","dips","plank","archer","hollow","catcow"]},
  {key:"legs", name:"Legs", desc:"Glutes, quads, posterior chain, calves — runner-focused single-leg work.",
   ex:["jack","squat","split","glute","hamstr","calf","sideplank","hipflex"]},
  {key:"recovery", name:"Recover", desc:"Active recovery + mobility. Ideal to stack on an easy run day.",
   ex:["catcow","worldg","pigeon","hamstretch","deadbug","ankle","breathe"]},
  {key:"pull", name:"Pull", desc:"Back, rear delts, posture. Undoes the hunch from desk + running.",
   ex:["jack","row","superman","reverse","plank","row","hollow","catcow"]},
  {key:"power", name:"Power", desc:"Explosive full-body, moderate volume. Keep landings soft.",
   ex:["jack","burpee","squat","climber","skater","pushup","flutter","catcow"]},
  {key:"core", name:"Core", desc:"Core & stability + runner hip/ankle work. Light enough to run same day.",
   ex:["jack","plank","deadbug","sideplank","bicycle","hollow","ankle","calf"]},
  {key:"mobility", name:"Mobility", desc:"Full recovery, stretch & breathe. Great on a long-run day.",
   ex:["catcow","worldg","hipflex","pigeon","hamstretch","ankle","breathe"]},
];

/* Week progression: work seconds & rest seconds by week (harder = more work, less rest) */
const PROG = {
  15: { work:[35,40,45,45], rest:[25,20,18,15], rounds:1 },
  30: { work:[40,45,45,50], rest:[20,18,15,15], rounds:2 },
};

/* ============ STATE ============ */
const S = {
  day: new Date().getDay() % 7,   // auto-pick today's rotation
  len: 15,
  week: 1,
  variation: {},                  // per exercise-key chosen tier (default 1)
  idx: 0,
  remaining: 0,
  running: false,
  timeline: [],
};

const store = {
  get(k,d){ try{return JSON.parse(localStorage.getItem("fg_"+k))??d;}catch(e){return d;} },
  set(k,v){ try{localStorage.setItem("fg_"+k, JSON.stringify(v));}catch(e){} },
};
S.len  = store.get("len",15);
S.week = store.get("week",1);
S.variation = store.get("variation",{});

/* ============ BUILD TIMELINE ============ */
function buildTimeline(){
  const day = DAYS[S.day];
  const p = PROG[S.len];
  const work = p.work[S.week-1], rest = p.rest[S.week-1];
  const tl = [{type:"prep", key:null, name:"Get ready", seconds:10}];
  for(let r=0; r<p.rounds; r++){
    day.ex.forEach((k,i)=>{
      tl.push({type:"work", key:k, seconds:work});
      // no rest after the very last item of the very last round
      const last = (r===p.rounds-1 && i===day.ex.length-1);
      if(!last) tl.push({type:"rest", key:null, name:"Rest", seconds:rest});
    });
  }
  tl.push({type:"done", key:null, name:"Session complete", seconds:0});
  S.timeline = tl;
  S.idx = 0;
  S.remaining = tl[0].seconds;
}

function exName(key){
  const tier = S.variation[key] ?? 1;
  return EX[key].v[tier];
}

/* ============ RENDER ============ */
const $ = id => document.getElementById(id);
const RING_R = 126, RING_C = 2*Math.PI*RING_R;
$("ring").style.strokeDasharray = RING_C;

function fmt(s){ const m=Math.floor(s/60); return m+":"+String(s%60).padStart(2,"0"); }

function renderDaySeg(){
  const seg = $("daySeg"); seg.innerHTML="";
  DAYS.forEach((d,i)=>{
    const b=document.createElement("button");
    b.textContent=d.name; if(i===S.day)b.className="on";
    b.onclick=()=>{ S.day=i; stop(); buildTimeline(); renderAll(); };
    seg.appendChild(b);
  });
}
function setSeg(segId, attr, val, cb){
  [...$(segId).children].forEach(b=>{
    b.classList.toggle("on", b.getAttribute(attr)==String(val));
    b.onclick=()=>{ cb(b.getAttribute(attr)); };
  });
}

function renderPlan(){
  const list=$("planList"); list.innerHTML="";
  const work = S.timeline.filter(t=>t.type==="work");
  // collapse to unique exercises for round 1 view
  const day=DAYS[S.day];
  day.ex.forEach((k,i)=>{
    const div=document.createElement("div");
    div.className="list-item"+(S.timeline[S.idx]?.key===k?" active":"");
    div.innerHTML=`<span class="n">${i+1}. ${exName(k)}</span><span class="s">${EX[k].cue.split(",")[0]}</span>`;
    list.appendChild(div);
  });
}

function renderTimer(){
  const step=S.timeline[S.idx];
  const accent = step.type==="rest"?"var(--rest)":step.type==="prep"?"var(--prep)":"var(--work)";
  $("ring").setAttribute("stroke",accent);
  $("phase").style.color=accent;
  $("phase").textContent = step.type==="rest"?"Recover":step.type==="prep"?"Standby":step.type==="done"?"Complete":"Work";
  $("time").textContent = fmt(S.remaining);

  let nm = step.name || (step.key?exName(step.key):"");
  $("exname").textContent = nm;
  $("cue").textContent = step.key?EX[step.key].cue:"";
  // variation row reflects current exercise
  const vr=$("varRow");
  if(step.key){
    vr.style.opacity=1; vr.style.pointerEvents="auto";
    const tier=S.variation[step.key]??1;
    [...vr.children].forEach(b=>b.classList.toggle("on", b.getAttribute("data-v")==String(tier)));
  } else { vr.style.opacity=.35; vr.style.pointerEvents="none"; }

  const nx=S.timeline[S.idx+1];
  $("next").textContent = nx && nx.type!=="done" ? "Next → "+(nx.key?exName(nx.key):nx.name)+" · "+nx.seconds+"s"
    : step.type==="done" ? "Great work, Fred." : "Final effort";

  // ring progress
  const pct = step.seconds>0 ? (step.seconds-S.remaining)/step.seconds : 1;
  $("ring").style.strokeDashoffset = RING_C - pct*RING_C;

  // overall bar
  const total=S.timeline.reduce((a,s)=>a+s.seconds,0);
  const before=S.timeline.slice(0,S.idx).reduce((a,s)=>a+s.seconds,0);
  const el=before+(step.seconds-S.remaining);
  $("overall").style.width=Math.min(100,(el/total)*100)+"%";

  const nWork=S.timeline.filter(s=>s.type==="work").length;
  const dWork=S.timeline.slice(0,S.idx+1).filter(s=>s.type==="work").length;
  $("foot").textContent=`Move ${Math.min(dWork,nWork)}/${nWork} · Session ${fmt(total)} · Wk ${S.week} · ${S.len}min`;

  $("startBtn").textContent = S.running?"❚❚ Pause":"▶ Start";
  $("startBtn").style.background=accent;
  if(step.type==="done"){$("startBtn").style.opacity=.4;} else {$("startBtn").style.opacity=1;}
}

function renderAll(){
  $("weekday").textContent = DAYS[S.day].name+" day · daily rotation";
  $("dayDesc").textContent = DAYS[S.day].desc;
  $("streak").textContent = store.get("streak",0)+"🔥";
  renderDaySeg();
  setSeg("lenSeg","data-len",S.len,(v)=>{S.len=+v;store.set("len",S.len);stop();buildTimeline();renderAll();});
  setSeg("weekSeg","data-week",S.week,(v)=>{S.week=+v;store.set("week",S.week);stop();buildTimeline();renderAll();});
  renderTimer();
  renderPlan();
}

/* ============ TIMER ENGINE ============ */
let interval=null;
function beep(freq=660,dur=.15,type="square",vol=.2){
  try{
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC)return;
    beep.ctx=beep.ctx||new AC(); const c=beep.ctx; if(c.state==="suspended")c.resume();
    const o=c.createOscillator(),g=c.createGain();
    o.type=type;o.frequency.value=freq;
    g.gain.setValueAtTime(vol,c.currentTime);
    g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+dur);
    o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+dur);
  }catch(e){}
}
function tick(){
  if(S.remaining<=1){
    const ni=S.idx+1;
    if(ni>=S.timeline.length){ finish(); return; }
    S.idx=ni;
    const step=S.timeline[ni];
    if(step.type==="done"){ finish(); return; }
    beep(step.type==="rest"?440:780,.25,"square",.25);
    S.remaining=step.seconds;
    renderTimer(); renderPlan();
    return;
  }
  if(S.remaining<=4) beep(600,.08,"sine",.14);
  S.remaining--;
  renderTimer();
}
function start(){
  if(S.timeline[S.idx].type==="done"){ buildTimeline(); }
  S.running=true; beep(660,.1,"square",.2);
  requestWakeLock();
  clearInterval(interval); interval=setInterval(tick,1000);
  renderTimer();
}
function stop(){ S.running=false; clearInterval(interval); releaseWakeLock(); renderTimer(); }
function finish(){
  stop();
  beep(880,.4,"sawtooth",.25); setTimeout(()=>beep(1150,.45,"sawtooth",.25),200);
  // streak: count one per finished session per day
  const today=new Date().toDateString();
  if(store.get("lastDone","")!==today){
    store.set("streak",(store.get("streak",0))+1);
    store.set("lastDone",today);
  }
  S.idx=S.timeline.length-1; S.remaining=0; renderAll();
}

$("startBtn").onclick=()=>{ S.running?stop():start(); };
$("reset").onclick=()=>{ stop(); buildTimeline(); renderAll(); };
$("prev").onclick=()=>{ stop(); S.idx=Math.max(0,S.idx-1); S.remaining=S.timeline[S.idx].seconds; renderTimer(); renderPlan(); };
$("skip").onclick=()=>{ stop(); S.idx=Math.min(S.timeline.length-1,S.idx+1); S.remaining=S.timeline[S.idx].seconds; renderTimer(); renderPlan(); };
$("varRow").onclick=(e)=>{
  const b=e.target.closest("button"); if(!b)return;
  const step=S.timeline[S.idx]; if(!step.key)return;
  S.variation[step.key]=+b.getAttribute("data-v");
  store.set("variation",S.variation);
  renderTimer(); renderPlan();
};

/* ============ WAKE LOCK (screen stays on) ============ */
let wakeLock=null;
async function requestWakeLock(){
  try{ if("wakeLock" in navigator){ wakeLock=await navigator.wakeLock.request("screen"); } }catch(e){}
}
function releaseWakeLock(){ try{ wakeLock&&wakeLock.release(); wakeLock=null; }catch(e){} }
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible" && S.running) requestWakeLock(); });

/* ============ ORIENTATION LOCK ============ */
async function lockPortrait(){
  try{ if(screen.orientation && screen.orientation.lock){ await screen.orientation.lock("portrait"); } }catch(e){ /* overlay handles the rest */ }
}

/* ============ PWA INSTALL ============ */
let deferred=null;
window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault(); deferred=e;
  const b=$("installBtn"); b.style.display="block";
  b.onclick=async()=>{ b.style.display="none"; deferred.prompt(); await deferred.userChoice; deferred=null; };
});
if(window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone){
  $("installTxt").innerHTML="<b>Installed.</b> You're running FredsGym as an app 💪";
}
if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}

/* ============ INIT ============ */
buildTimeline();
renderAll();
lockPortrait();
</script>
</body>
</html>
