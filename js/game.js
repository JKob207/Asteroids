window.onload = function(){ //odpal funckję kiedy wysztsko zostanie załadowe na stronie
    Game.init()
};

VAR = { //różne info przydatne w grze
 fps:60,
  W:0, //szerokość okna
  H:0, //wysokość okna
  lastTime: 0,
  rand:function(min,max){
      return Math.floor(Math.random()* (max-min+1)+min)
  }
};

Game = {
    init:function(){
        Sound.init()
        Game.canvas = document.createElement("canvas")
        Game.hitCanvas = document.createElement("canvas")
        Game.ctx = Game.canvas.getContext("2d")
        Game.hitCtx = Game.hitCanvas.getContext("2d")
        Game.layout()
        
        window.addEventListener("resize",Game.layout,false)

        // document.body.appendChild(Game.hitCanvas)
        document.body.appendChild(Game.canvas)

        for(let i=0;i<4;i++)
        {
            new Rock()
        }

        Game.ship = new Ship()
        
        window.addEventListener("keydown",Game.onKey,false)
        window.addEventListener("keyup",Game.onKey,false)

        Game.animationLoop()
    },
    stop:function()
    {
        window.removeEventListener("keydown",Game.onKey,false)
        window.removeEventListener("keyup",Game.onKey,false)
    },
    onKey:function(e){
        if(e.keyCode == 32 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39)
        {
            e.preventDefault()
            if(e.type == "keydown" && !Game["key_"+e.keyCode])
            {
                Game["key_"+e.keyCode] = true
                if(e.keyCode == 37)
                {
                    Game.key_39 = false
                }else if(e.keyCode == 39)
                {
                    Game.key_37 = false
                }else if(e.keyCode==32)
                {
                    new Bullet()
                }
            }else if(e.type == "keyup"){
                Game["key_"+e.keyCode] = false
            }
        }
    },
    layout:function(e){
        VAR.W = window.innerWidth
        VAR.H = window.innerHeight

        VAR.d = Math.min(VAR.W, VAR.H)

        Game.canvas.width = VAR.W
        Game.canvas.height = VAR.H

        Game.hitCanvas.width = VAR.W
        Game.hitCanvas.height = VAR.H
        Game.hitCtx.fillStyle = "red"

        Game.ctx.fillStyle = "white"
        Game.ctx.strokeStyle = "white"
        Game.ctx.lineWidth = 3
        Game.ctx.lineJoin = "round"
    },
    animationLoop:function(time){
        requestAnimationFrame(Game.animationLoop)
        if(time-VAR.lastTime >=1000/VAR.fps)
        {
            VAR.lastTime = time

            Game.ctx.clearRect(0,0,VAR.W,VAR.H)

            Game.ship.draw()
            
            Rock.draw()

            Bullet.draw()

            Dot.draw()

            
        }
    }
}
