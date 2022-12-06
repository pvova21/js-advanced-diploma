!function(){"use strict";function e(e,t){const s=t**2,a=t-1;return 0===e?"top-left":e===a?"top-right":e>0&&e<a?"top":e===s-1-a?"bottom-left":e===s-1?"bottom-right":e>s-1-a&&e<s-1?"bottom":e%t==0?"left":(e+1)%t==0?"right":"center"}class t{constructor(){this.boardSize=8,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(t){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(e=>this.onNewGameClick(e))),this.saveGameEl.addEventListener("click",(e=>this.onSaveGameClick(e))),this.loadGameEl.addEventListener("click",(e=>this.onLoadGameClick(e))),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(t);for(let t=0;t<this.boardSize**2;t+=1){const s=document.createElement("div");s.classList.add("cell","map-tile",`map-tile-${e(t,this.boardSize)}`),s.addEventListener("mouseenter",(e=>this.onCellEnter(e))),s.addEventListener("mouseleave",(e=>this.onCellLeave(e))),s.addEventListener("click",(e=>this.onCellClick(e))),this.boardEl.appendChild(s)}this.cells=Array.from(this.boardEl.children)}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const s of e){const e=this.boardEl.children[s.position],a=document.createElement("div");a.classList.add("character",s.character.type);const i=document.createElement("div");i.classList.add("health-level");const o=document.createElement("div");o.classList.add("health-level-indicator","health-level-indicator-"+((t=s.character.health)<15?"critical":t<50?"normal":"high")),o.style.width=`${s.character.health}%`,i.appendChild(o),a.appendChild(i),e.appendChild(a)}var t}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((e=>e.call(null,t)))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((e=>e.call(null,t)))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((e=>e.call(null,t)))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach((e=>e.call(null)))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach((e=>e.call(null)))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach((e=>e.call(null)))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yellow";this.deselectCell(e),this.cells[e].classList.add("selected",`selected-${t}`)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter((e=>e.startsWith("selected"))))}showCellTooltip(e,t){this.cells[t].title=e}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise((s=>{const a=this.cells[e],i=document.createElement("span");i.textContent=t,i.classList.add("damage"),a.appendChild(i),i.addEventListener("animationend",(()=>{a.removeChild(i),s()}))}))}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}var s="prairie",a="desert",i="arctic",o="mountain";class n{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"generic";if(this.level=e,this.attack=0,this.defence=0,this.health=50,this.type=t,"Character"===new.target.name)throw Error("Нельзя создавать объект new Character()")}}class r extends n{constructor(e){super(e),this.attack=25,this.deffence=25,this.type="bowman",this.level=e,this.distance=2,this.distanceAttack=2}}class l extends n{constructor(e){super(e),this.attack=10,this.defence=40,this.type="daemon",this.level=e,this.distance=1,this.distanceAttack=4}}class h extends n{constructor(e){super(e),this.attack=10,this.deffence=40,this.type="magician",this.level=e,this.distance=1,this.distanceAttack=4}}class c extends n{constructor(e){super(e),this.attack=40,this.deffence=10,this.type="swordsman",this.level=e,this.distance=4,this.distanceAttack=1}}class d extends n{constructor(e){super(e),this.attack=40,this.deffence=10,this.type="undead",this.level=e,this.distance=4,this.distanceAttack=1}}class m extends n{constructor(e){super(e),this.attack=25,this.deffence=25,this.type="vampire",this.level=e,this.distance=2,this.distanceAttack=2}}class p{static getStartPlayerTeam(){return[new r(1),new c(1)]}static getPlayerTeam(){return[r,c,h]}static getComputerTeam(){return[l,d,m]}}function*u(e,t){const s=Math.floor(Math.random()*e.length),a=Math.floor(Math.random()*t+1);yield new e[s](a)}function g(e,t,s){const a=[];for(;a.length<s;)a.push(...u(e,t));return a}class f{constructor(e,t){if(!(e instanceof n))throw new Error("character must be instance of Character or its children");if("number"!=typeof t)throw new Error("position must be a number");this.character=e,this.position=t}}class v{static from(e){return"object"==typeof e?e:null}}var y="auto",w="pointer",C="crosshair",L="not-allowed";function P(e,t,s){const a=[],i=Math.floor(e/s),o=e%s;for(let e=1;e<=t;e+=1)o+e<8&&a.push(8*i+(o+e)),o-e>=0&&a.push(8*i+(o-e)),i+e<8&&a.push(8*(i+e)+o),i-e>=0&&a.push(8*(i-e)+o),i+e<8&&o+e<8&&a.push(8*(i+e)+(o+e)),i-e>=0&&o-e>=0&&a.push(8*(i-e)+(o-e)),i+e<8&&o-e>=0&&a.push(8*(i+e)+(o-e)),i-e>=0&&o+e<8&&a.push(8*(i-e)+(o+e));return a}let T,b,k,E,M=0,x=[],G=[];class S{constructor(e,t){this.gamePlay=e,this.stateService=t,this.currentAction="player",this.selectedCharacter={},this.selected=!1,this.point=0,this.level=1,this.currentTheme=s,this.blockedBoard=!1,this.playerTeam=[],this.computerTeam=[],this.idx=0}init(){this.events(),this.nextLevel()}events(){this.gamePlay.addNewGameListener(this.newGame.bind(this)),this.gamePlay.addSaveGameListener(this.saveGame.bind(this)),this.gamePlay.addLoadGameListener(this.loadGame.bind(this)),this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),this.gamePlay.addCellClickListener(this.onCellClick.bind(this))}nextLevel(){if(this.currentAction="player",1===this.level)this.playerTeam=p.getStartPlayerTeam(),this.compTeam=g(p.getComputerTeam(),1,2),S.addCharacterPosition(this.playerTeam,this.compTeam);else if(2===this.level)this.currentTheme=a,this.playerTeam=g(p.getPlayerTeam(),1,1),this.compTeam=g(p.getComputerTeam(),2,this.playerTeam.length+x.length),S.addCharacterPosition(this.playerTeam,this.compTeam);else if(3===this.level)this.currentTheme=i,this.playerTeam=g(p.getPlayerTeam(),2,2),this.compTeam=g(p.getComputerTeam(),3,this.playerTeam.length+x.length),S.addCharacterPosition(this.playerTeam,this.compTeam);else{if(4!==this.level)return this.blockedBoard=!0,void t.showMessage(`Your score ${this.point}. Best score: ${this.maxPoints()}.`);this.currentTheme=o,this.playerTeam=g(p.getPlayerTeam(),3,2),this.compTeam=g(p.getComputerTeam(),4,this.playerTeam.length+x.length),S.addCharacterPosition(this.playerTeam,this.compTeam)}const e=S.getPositions(x.length);for(let t=0;t<x.length;t+=1)x[t].position=e.player[t],G[t].position=e.computer[t];this.gamePlay.drawUi(this.currentTheme),this.gamePlay.redrawPositions([...x,...G])}newGame(){this.blockedBoard=!1;const e=this.maxPoints(),a=this.stateService.load();a&&(a.maxPoint=e,this.stateService.save(v.from(a))),x=[],G=[],this.level=1,this.point=0,this.currentTheme=s,this.nextLevel(),t.showMessage("New Game Begins!")}saveGame(){const e=this.maxPoints(),s={point:this.point,maxPoint:e,level:this.level,currentTheme:this.currentTheme,playerPositions:x,computerPositions:G};this.stateService.save(v.from(s)),t.showMessage("Game Saved!")}loadGame(){try{const e=this.stateService.load();e&&(this.point=e.point,this.level=e.level,this.currentTheme=e.currentTheme,x=e.playerPositions,G=e.computerPositions,this.gamePlay.drawUi(this.currentTheme),this.gamePlay.redrawPositions([...x,...G])),t.showMessage("Game loaded!")}catch(e){console.log(e),t.showError("Loading failed!"),this.newGame()}}static rowColumnToIndex(e,t){return 8*e+t}static addCharacterPosition(e,t){for(let t=0;t<e.length;t+=1)x.push(new f(e[t],0));for(let e=0;e<t.length;e+=1)G.push(new f(t[e],0))}static getPositions(e){const t={player:[],computer:[]};let s;const a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return 8*Math.floor(8*Math.random())+(Math.floor(2*Math.random())+e)};for(let i=0;i<e;i+=1){do{s=a()}while(t.player.includes(s));t.player.push(s);do{s=a(6)}while(t.computer.includes(s));t.computer.push(s)}return t}static attackAndDefenceLevelUp(e,t){return Math.floor(Math.max(e,e*(1.8-t/100)))}async onCellClick(e){if(this.idx=e,!this.blockedBoard)if("not-allowed"===this.gamePlay.boardEl.style.cursor)t.showError("invalid action");else if(-1!==this.getIndex([...x]))this.gamePlay.deselectCell(M),this.gamePlay.selectCell(e),M=e,this.selectedCharacter=[...x].find((t=>t.position===e)),this.selected=!0;else if(this.selected||-1===this.getIndex([...G])){if(this.selected&&"pointer"===this.gamePlay.boardEl.style.cursor)this.selectedCharacter.position=e,this.gamePlay.deselectCell(M),this.gamePlay.deselectCell(e),this.selected=!1,this.gamePlay.redrawPositions([...x,...G]),this.currentAction="computer",this.computerStrategy();else if(this.selected&&"crosshair"===this.gamePlay.boardEl.style.cursor){const t=[...G].find((t=>t.position===e));this.gamePlay.deselectCell(M),this.gamePlay.deselectCell(e),this.gamePlay.setCursor(y),this.selected=!1,await this.characterAttacker(this.selectedCharacter.character,t),G.length>0&&this.computerStrategy()}}else t.showError("Cannot choose this character!")}getIndex(e){return e.findIndex((e=>e.position===this.idx))}maxPoints(){let e=0;try{const t=this.stateService.load();t&&(e=Math.max(t.maxPoint,this.point))}catch(t){e=this.point,console.log(t)}return e}async characterAttacker(e,s){const a=s.character;let i=Math.max(e.attack-a.defence,.1*e.attack);if(i=Math.floor(i),await this.gamePlay.showDamage(s.position,i),a.health-=i,this.currentAction="computer"===this.currentAction?"player":"computer",a.health<=0&&(x=x.filter((e=>e.position!==s.position)),G=G.filter((e=>e.position!==s.position)),0===x.length&&(t.showMessage("Game over"),this.blockedBoard=!0),0===G.length)){for(const e of x)this.point+=e.character.health;(()=>{for(const e of x){const t=e.character;t.level+=1,t.attack=S.attackAndDefenceLevelUp(t.attack,t.health),t.defence=S.attackAndDefenceLevelUp(t.defence,t.health),t.health=t.health+80<100?t.health+80:100}})(),this.level+=1,this.nextLevel()}this.gamePlay.redrawPositions([...x,...G])}async computerAttacks(e,t){await this.characterAttacker(e,t),this.currentAction="player"}computerStrategy(){if("computer"===this.currentAction){const e=e=>{for(const t of[...x])if(e.includes(t.position))return t;return null};for(const t of[...G]){k=this.selectedCharacter.character.distanceAttack,E=t.position,T=this.gamePlay.boardSize;const s=e(P(E,k,T));if(null!==s)return void this.computerAttacks(t.character,s)}const t=Math.floor(Math.random()*[...G].length),s=[...G][t];this.computerMove(s),this.gamePlay.redrawPositions([...x,...G]),this.currentAction="player"}}computerMove(e){const t=e,s=e.character.distance;let a,i,o,n,r;const l=this.positionRow(t.position),h=this.positionColumn(t.position);let c={};for(const e of[...x]){const t=this.positionRow(e.position),s=this.positionColumn(e.position);o=l-t,n=h-s,r=Math.abs(o)+Math.abs(n),(void 0===c.steps||r<c.steps)&&(c={steprow:o,stepcolumn:n,steps:r,positionRow:t,positionColumn:s})}Math.abs(c.steprow)===Math.abs(c.stepcolumn)?Math.abs(c.steprow)>s?(a=l-s*Math.sign(c.steprow),i=h-s*Math.sign(c.stepcolumn),t.position=S.rowColumnToIndex(a,i)):(a=l-(c.steprow-1*Math.sign(c.steprow)),i=h-(c.stepcolumn-1*Math.sign(c.steprow)),t.position=S.rowColumnToIndex(a,i)):0===c.stepcolumn?Math.abs(c.steprow)>s?(a=l-s*Math.sign(c.steprow),t.position=S.rowColumnToIndex(a,h)):(a=l-(c.steprow-1*Math.sign(c.steprow)),t.position=S.rowColumnToIndex(a,h)):0===c.steprow?Math.abs(c.stepcolumn)>s?(i=h-s*Math.sign(c.stepcolumn),t.position=S.rowColumnToIndex(l,i)):(i=h-(c.stepcolumn-1*Math.sign(c.stepcolumn)),t.position=S.rowColumnToIndex(l,i)):Math.abs(c.steprow)>Math.abs(c.stepcolumn)?Math.abs(c.steprow)>s?(a=l-s*Math.sign(c.steprow),t.position=S.rowColumnToIndex(a,h)):(a=l-c.steprow,t.position=S.rowColumnToIndex(a,h)):Math.abs(c.stepcolumn)>s?(i=h-s*Math.sign(c.stepcolumn),t.position=S.rowColumnToIndex(l,i)):t.position=S.rowColumnToIndex(l,h)}positionRow(e){return Math.floor(e/this.gamePlay.boardSize)}positionColumn(e){return e%this.gamePlay.boardSize}onCellEnter(e){if(this.idx=e,!this.blockedBoard){for(const s of[...x,...G])s.position===e&&this.gamePlay.showCellTooltip(`🎖${(t=s.character).level} ⚔${t.attack} 🛡${t.defence} ❤${t.health}`,e);if(this.selected){E=this.selectedCharacter.position,b=this.selectedCharacter.character.distance,T=this.gamePlay.boardSize;const t=P(E,b,T);k=this.selectedCharacter.character.distanceAttack;const s=P(E,k,T);-1!==this.getIndex(x)?this.gamePlay.setCursor(w):t.includes(e)&&-1===this.getIndex([...x,...G])?(this.gamePlay.selectCell(e,"green"),this.gamePlay.setCursor(w)):s.includes(e)&&-1!==this.getIndex(G)?(this.gamePlay.selectCell(e,"red"),this.gamePlay.setCursor(C)):this.gamePlay.setCursor(L)}}var t}onCellLeave(e){this.selectedCharacter.position!==e&&this.gamePlay.deselectCell(e),this.gamePlay.hideCellTooltip(e),this.gamePlay.setCursor(y)}}const A=new t;A.bindToDOM(document.querySelector("#game-container"));const I=new class{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}(localStorage);new S(A,I).init()}();