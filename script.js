const questions = [
 {title:"Did you eat breakfast today?",subtitle:"Be honest with me, baby. 🥺",yesText:"Yes, baby! 💗",noText:"No, I didn't 😬",yesSpeech:"YAY!! That's my handsome boy! 🥰",noSpeech:"EXCUSE ME?! WE NEED TO FIX THIS! 😡",yesResponse:"I'm so proud of you! Keep taking care of yourself, baby. 💗",noResponse:"Baby, please get something nourishing to eat. I care about you! ❤️"},
 {title:"Have you had some water?",subtitle:"Your body needs water too, handsome. 💧",yesText:"Yes, I'm hydrated! 💧",noText:"Not yet 😅",yesSpeech:"Look at you being responsible! 🥰",noSpeech:"GO GET YOUR WATER, SIR! 😤",yesResponse:"I'm proud of you for remembering to hydrate! 💕",noResponse:"Go grab a glass of water when you can, baby. 💗"},
 {title:"Did you get enough sleep?",subtitle:"I want you feeling rested, baby. 🌙",yesText:"Yes, I slept well! 😴",noText:"Not really 🥱",yesSpeech:"My well-rested handsome boy! 💖",noSpeech:"Someone needs a cozy evening tonight! 🥺",yesResponse:"I'm glad you got some rest, love. ❤️",noResponse:"Be gentle with yourself today and rest when you can. 💗"},
 {title:"Did you breathe, baby?",subtitle:"Please confirm you're still alive for me 😂💗",yesText:"Yes, baby, I breathed! 😂",noText:"I forgot 😭",yesSpeech:"GOOD. I need you alive and well, handsome! 😘",noSpeech:"BABY. PLEASE INHALE. EXHALE. RIGHT NOW. 😭❤️",yesResponse:"Okay, good. Keep breathing and being my favourite person. 💗",noResponse:"Inhale... exhale... there you go, baby. 😂💕"},
 {title:"Are you ready for your day?",subtitle:"One last question before we finish our drive. 💌",yesText:"Ready, baby! 💪",noText:"I need a hug first 🥺",yesSpeech:"THAT'S MY MAN! GO GET 'EM! 💖",noSpeech:"Come here, baby. BIG HUG. 🫂",yesResponse:"You can do this! I'm always cheering for you. ❤️",noResponse:"Sending you the biggest virtual hug. One thing at a time. 💗"}
];
const $ = id => document.getElementById(id);
let currentQuestion = 0, moving = false;
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$(id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}
function renderQuestion(){
 const q=questions[currentQuestion];
 $('stepLabel').textContent=`STOP ${currentQuestion+1} OF ${questions.length}`;
 $('progressFill').style.width=`${((currentQuestion+1)/questions.length)*100}%`;
 $('questionTitle').textContent=q.title; $('questionSubtitle').textContent=q.subtitle;
 $('speech').textContent="I'm listening, baby! 💗";$('response').textContent='';
 $('girl').className='girl happy';
 $('answerArea').innerHTML='';
 const yes=document.createElement('button');yes.className='btn';yes.textContent=q.yesText;yes.addEventListener('click',()=>answerQuestion('yes'));
 const no=document.createElement('button');no.className='btn secondary';no.textContent=q.noText;no.addEventListener('click',()=>answerQuestion('no'));
 $('answerArea').append(yes,no);
 showScreen('questionScreen');
}
function answerQuestion(answer){
 if(moving)return; moving=true;
 const q=questions[currentQuestion];
 $('answerArea').querySelectorAll('button').forEach(b=>b.disabled=true);
 $('girl').className='girl '+(answer==='yes'?'happy':'angry');
 $('speech').textContent=answer==='yes'?q.yesSpeech:q.noSpeech;
 $('response').textContent=answer==='yes'?q.yesResponse:q.noResponse;
 setTimeout(()=>{
  $('transitionMessage').textContent=currentQuestion===questions.length-1?'Driving straight to my heart... 💗':'On our way to the next stop, baby... 💗';
  const overlay=$('driveTransition');overlay.classList.add('active');overlay.setAttribute('aria-hidden','false');
 },4200);
 setTimeout(()=>{
  currentQuestion++;
  if(currentQuestion>=questions.length){showScreen('finalScreen');}
  else{renderQuestion();}
  setTimeout(()=>{
   const overlay=$('driveTransition');overlay.classList.remove('active');overlay.setAttribute('aria-hidden','true');
   moving=false;
  },100);
 },6800);
}
$('startBtn').addEventListener('click',()=>{
 if(moving)return;moving=true;
 $('transitionMessage').textContent='Starting our little adventure... 💗';
 const overlay=$('driveTransition');overlay.classList.add('active');overlay.setAttribute('aria-hidden','false');
 setTimeout(()=>{currentQuestion=0;renderQuestion();overlay.classList.remove('active');overlay.setAttribute('aria-hidden','true');moving=false;},2400);
});
$('saveBtn').addEventListener('click',()=>{
 const food=$('foodJournal').value.trim();
 if(!food){$('saveMessage').textContent='Tell me what you ate first, baby! 💗';return;}
 try{localStorage.setItem('boyfriendBreakfast',food);$('saveMessage').textContent='Saved on this device! Thank you for telling me, handsome. 💌';}
 catch(e){$('saveMessage').textContent='Your browser could not save this answer, but you can still write it here. 💗';}
});
$('restartBtn').addEventListener('click',()=>{currentQuestion=0;renderQuestion();});
try{const saved=localStorage.getItem('boyfriendBreakfast');if(saved)$('foodJournal').value=saved;}catch(e){}
