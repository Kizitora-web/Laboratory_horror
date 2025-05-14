let index = 0;
let is_choices = false
const textEl = document.getElementById('text');
const choicesEl = document.getElementById('choices');
const soundEl = document.getElementById('sound');
const startsoundEL = document.getElementById('start_sound');
  
function playSound(filename) {
    if (filename) {
        soundEl.src = filename;
        soundEl.play();
    }
}

function showbg(filename) {
    if (filename) {
        if (Array.isArray(filename)) {
            const bgValue = filename.slice().reverse().map(f => `url('${f}')`).join(', ');
            document.body.style.backgroundImage = bgValue;
            document.body.style.backgroundSize = '100%, 170%';
        } else {
            document.body.style.backgroundImage = `url('${filename}')`;
            document.body.style.backgroundSize = '170%';
        }
    }
}

document.getElementById('game-box').addEventListener('click', () => {
    if (!is_choices){
        index++;
        showScene(index);
    }
})
  
function showScene(i) {
    const scene = script[i];
    if (!scene) return;

    textEl.textContent = scene.text;
    textEl.innerHTML = scene.text.replace(/\n/g, '<br>')
    playSound(scene.sound);
    showbg(scene.bg);
    choicesEl.innerHTML = '';

    if (scene.choices.length != 0) {
        is_choices = true
        document.getElementById("next-indicator").style.display = "none"
        scene.choices.forEach(choice => {
            const btn = document.createElement('div');
            btn.className = 'choice';
            btn.textContent = choice;
            btn.onclick = () => {
                is_choices = false
                index++;
                showScene(index);
            };
            choicesEl.appendChild(btn);
        });
    } else {
        
        const indicator = document.createElement('span');
        indicator.id = "next-indicator";
        indicator.textContent = '▽';
        indicator.style.display = 'inline';
        textEl.appendChild(indicator)
        
    }
  }

document.getElementById('start_button').addEventListener('click', () => {
    startsoundEL.play();
    startsoundEL.addEventListener('ended', () => {
        document.getElementById('title').style.display = 'none';
        document.getElementById('game_screen').style.display = 'block';
        showScene(index);
    })
})  