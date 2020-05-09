function Ship()
{
    this.r = 0.04 //promień koła statku
    this.rear_a = 50 //kąt względem wierzchołków
    this.a = 0 //poczatkowy kąt

    this.x = VAR.W/2 //środek statku
    this.y = VAR.H/2

    this.modX = 0 //o ile jest modyfikowana pozycja statku
    this.modY = 0

    this.acc = 0.0004//przśpieszenie

    this.maxMod = 0.019 //maksymalna prędkość

    this.points = [{},{},{}] //trzy obiekty z wierzchołakami statku
}

Ship.prototype.hitTest = function()
{
    for(let i=0;i<this.points.length;i++)
    {
        for(let r in Rock.all)
        {
            if(Rock.all[r].hitTest(this.points[i].x, this.points[i].y))
            {
                Rock.all[r].remove()
                return true
            }
        }   
    }
    return false
}

Ship.prototype.draw = function(){
if(!this.destroyed)
{
    if(this.hitTest())
    {
        this.destroyed = true
        Game.stop()
    }else{
        if(Game.key_37 || Game.key_39) //obrót
        {
            this.a = this.a + 7*( Game.key_37 ? -1 : 1 )
        }
        if(Game.key_38) //przyśpieszenie
        {
            this.modX =  Math.max(-this.maxMod*VAR.d, Math.min(this.maxMod*VAR.d, this.modX+Math.sin(Math.PI/180*this.a)*this.acc*VAR.d))
            this.modY = this.modY-Math.cos(Math.PI/180*this.a)*this.acc*VAR.d
        }else{
            this.modX = this.modX*0.98

            this.modX = Math.abs(this.modX)<0.0001 ? 0 : this.modX

            this.modY = this.modY*0.98

            this.modY = Math.abs(this.modY)<0.0001 ? 0 : this.modY
        }

        this.x+=this.modX
        this.y+=this.modY

        Game.ctx.beginPath()
        for(let i=0;i<3;i++)
        {
            this.tmp_a = i===0 ? this.a : (this.a+180+(i===1 ? this.rear_a : -this.rear_a))//kąt w zależności jaki punkt jest obliczany
            this.tmp_r = i===0 ? this.r : this.r*0.6
            this.points[i].x = Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d+this.x
            this.points[i].y = -Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d+this.y

            Game.ctx[ i===0 ? 'moveTo' : 'lineTo' ](this.points[i].x,this.points[i].y)
        }
        Game.ctx.closePath()
        Game.ctx.stroke()

        //płomień odrzutu
        
        if(Game.key_38 && this.draw_thrust)
        {
            Game.ctx.beginPath()
            this.draw_thrust = false
            for(let i=0;i<3;i++)
            {
                this.tmp_a = i!= 1 ? this.a+180+(i===0 ? -this.rear_a+14 : this.rear_a-14) : this.a+180
                this.tmp_r = i==1 ? this.r : this.r*0.5

                Game.ctx[i===0 ? 'moveTo' : 'lineTo'](
                    Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d+this.x,
                    -Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d+this.y
                )
            }
        Game.ctx.stroke()
        }else if(Game.key_38 && !this.draw_thrust)
        {
            this.draw_thrust = true
        }

        if(Game.key_38 && (!Game.thrustSound || Game.thrustSound <= 0))
        {
            Game.thrustSound = 60
            Sound.play('thrust')
        }else if(Game.key_38 && Game.thrustSound)
        {
            Game.thrustSound -= 1000/VAR.fps
        }else if(!Game.key_38)
        {
            Game.thrustSound = false
        }

        if(this.points[0].x<0 && this.points[1].x<0 && this.points[2].x<0)
        {
            this.x+=VAR.W - Math.min(this.points[0].x, this.points[1].x, this.points[2].x)*0.9
        }else if(this.points[0].x>VAR.W && this.points[1].x>VAR.W && this.points[2].x>VAR.W)
        {
            this.x-=VAR.W-(VAR.W-Math.max(this.points[0].x, this.points[1].x, this.points[2].x))*0.9
        }

        if(this.points[0].y<0 && this.points[1].y<0 && this.points[2].y<0)
        {
            this.y+=VAR.H - Math.min(this.points[0].y, this.points[1].y, this.points[2].y)*0.9
        }else if(this.points[0].y>VAR.H && this.points[1].y>VAR.W && this.points[2].y>VAR.H)
        {
            this.y-=VAR.H-(VAR.H-Math.max(this.points[0].y, this.points[1].y, this.points[2].y))*0.9
        }
    }        
}
}