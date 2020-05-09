Dot.count = 0
Dot.all = {}
Dot.maxD = 25 
function Dot(x,y)
{
    Dot.count++
    this.id = Dot.count
    Dot.all[this.id] = this
    this.x = x
    this.y = y
    this.d = 0
    this.modX = VAR.rand(3,7)*(VAR.rand(0,1) ? 1 : -1)
    this.modY = VAR.rand(3,7)*(VAR.rand(0,1) ? 1 : -1)
}

Dot.prototype.draw = function(){
    this.x+=this.modX
    this.y+=this.modY
    this.d++
    Game.ctx.fillRect(this.x,this.y,3,3)
    if(this.d>Dot.maxD)
    {
        delete Dot.all[this.id]
    }
}

Dot.add = function(x,y){
    var n = VAR.rand(10,20)
    for(let i=0;i<n;i++)
    {
        new Dot(x,y)
    }
}

Dot.draw = function(){
    for(let d in Dot.all)
    {
        Dot.all[d].draw()
    }
}