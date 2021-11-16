const slider=document.getElementById("slider");
const slidertext=document.getElementById("slidertext");
const hexinput=document.getElementById("hexinput");
const inputcolor=document.getElementById("inputcolor");
const alteredcolor=document.getElementById("alteredcolor");
const altertext=document.getElementById("alteredtext");
const inputtext=document.getElementById("inputtext");
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
  if(toggleBtn.classList.contains('toggled')){
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } else {
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  } 
})


hexinput.addEventListener('keyup', () => {
  
  const hex = hexinput.value;
  if(!isValidHex(hex)) return;
  
  const strippedHex = hex.replace('#', '');

  inputcolor.style.backgroundColor = "#" + strippedHex;  
  reset(); 
});


const convertHexToRGB = (hex) => {
  if(!isValidHex(hex)) return null;
  
  let strippedHex = hex.replace('#', '');

  if(strippedHex.length === 3){
    strippedHex = strippedHex[0] + strippedHex[0] 
    + strippedHex[1] + strippedHex[1] 
    + strippedHex[2] + strippedHex[2];
  }
  
  const r  = parseInt(strippedHex.substring(0,2), 16);
  const g  = parseInt(strippedHex.substring(2,4), 16);
  const b  = parseInt(strippedHex.substring(4,6), 16);
  
  return {r,g,b};
}

const convertRGBToHex = (r,g,b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);
  
  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
}

const isValidHex = (hex) => {
  if(!hex) return false;
  
  const strippedHex = hex.replace('#', '');
  return strippedHex.length === 3 || strippedHex.length === 6;
}

const alterColor = (hex, percentage) => {
  const {r, g, b} = convertHexToRGB(hex);
  
  const amount = Math.floor((percentage/100) * 255);
  const newR = increaseWithin0To255(r,amount);
  const newG = increaseWithin0To255(g,amount);
  const newB = increaseWithin0To255(b,amount)
  return convertRGBToHex(newR, newG, newB);
}
const increaseWithin0To255 = (hex, amount) => {
  // const newHex = hex + amount;
  // if(newHex > 255) return 255;
  // if(newHex < 0) return 0;
  // return newHex;
  return Math.min(255, Math.max(0, hex + amount));
}
slider.addEventListener('input', () => {
   if(!isValidHex(hexinput.value)) return;
  
  slidertext.textContent = `${slider.value}%`;
  //get the altered hex value
  const valueAddition  = 
    toggleBtn.classList.contains('toggled') ? 
    -slider.value 
    : slider.value;
  const alteredHex = alterColor(hexinput.value, valueAddition);
  alteredcolor.style.backgroundColor = alteredHex;
  altertext.innerText = `Altered Color ${alteredHex}`;
  })

  const reset = () =>{ 
    slider.value = 0;
    sliderText.innerText=`0%`;
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColorText.innerText = `Altered Color ${hexInput.value}`; 
  
  }