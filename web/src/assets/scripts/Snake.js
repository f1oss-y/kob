import { GameObject } from "./GameObject";
import {Cell} from './Cell';

export class Snake extends GameObject{
    constructor(info,gamemap){
        super();

        this.id=info.id;
        this.color=info.color;
        this.gamemap=gamemap;

        //存放蛇身体，cells[0]存放蛇头
        this.cells=[new Cell(info.r,info.c)];

        //下一步的目标位置
        this.next_cell=null;

        //蛇速度
        this.speed=5;

        //-1:没有指令，0，1，2，3:上下左右
        this.direction=-1;

        //idle:静止,move:移动,die:死亡
        this.status="idle";

        //行列偏移量
        this.dr=[-1,0,1,0];
        this.dc=[0,1,0,-1];

        //回合数
        this.step=0;

        //允许误差
        this.eps=1e-2;

        this.eye_direction = 0;
        //左下角初始朝向上，又下角初始朝向下
        if(this.id===1)this.eye_direction=2;        

        //蛇眼睛的不同方向x的偏移量
        this.eye_dx=[
            [-1,1],
            [1,1],
            [1,-1],
            [-1,-1],
        ];
        //蛇眼睛的不同方向y的偏移量
        this.eye_dy=[
            [-1,-1],
            [-1,1],
            [1,1],
            [1,-1],
        ];
    }

    start(){

    }

    set_direction(d){
        this.direction=d;
    }

    //检测当前回合,蛇的长度是否增加
    check_tail_increasing(){
        if(this.step<=10)return true;
        if(this.step%3===1)return true;
        return false;
    }

    //将蛇的状态变为走下一步
    next_step(){
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r+this.dr[d],this.cells[0].c+this.dc[d]);
        this.eye_direction=d;
        //清空操作
        this.direction=-1;
        this.status="move";
        this.step++;

        const k = this.cells.length;
        for(let i=k;i>0;i--){
            this.cells[i]=JSON.parse(JSON.stringify(this.cells[i-1]));
        }

    }

    update_move(){
        //每帧之间走的距离
        const dx = this.next_cell.x-this.cells[0].x;
        const dy = this.next_cell.y-this.cells[0].y;
        const distance=Math.sqrt(dx*dx+dy*dy);

        //走到目标点
        if(distance<this.eps){
            //添加新蛇头
            this.cells[0]=this.next_cell;
            this.next_cell=null;
            //走完停下来
            this.status="idle";
            if(!this.check_tail_increasing()){
                this.cells.pop();
            }
        }else{
            const move_distance = this.speed * this.timedelta/1000;
            this.cells[0].x+=move_distance*dx/distance;
            this.cells[0].y+=move_distance*dy/distance;

            if(!this.check_tail_increasing()){
                const k = this.cells.length;
                const tail = this.cells[k-1],tail_target=this.cells[k-2];
                const tail_dx=tail_target.x-tail.x;
                const tail_dy=tail_target.y-tail.y;
                tail.x+=move_distance*tail_dx/distance;
                tail.y+=move_distance*tail_dy/distance;
            }
        }
    }

    //每帧执行一次
    update(){
        if(this.status==="move"){
            this.update_move();
        }
        this.render();
    }

    render(){
        const L=this.gamemap.L;
        const ctx=this.gamemap.ctx;

        ctx.fillStyle=this.color;

        if(this.status==="die"){
            ctx.fillStyle="white";
        }

        for(const cell of this.cells){
            ctx.beginPath();
            ctx.arc(cell.x*L,cell.y*L,L/2*0.8,0,Math.PI*2);
            ctx.fill();
        }

        for(let i =1;i<this.cells.length;i++){
            const a = this.cells[i-1],b=this.cells[i];
            if(Math.abs(a.x-b.x)<this.eps&&Math.abs(a.y-b.y)<this.eps)
                continue;
            if(Math.abs(a.x-b.x)<this.eps){
                ctx.fillRect((a.x-0.4)*L,Math.min(a.y,b.y)*L,L*0.8,Math.abs(a.y-b.y)*L);
            }else{
                ctx.fillRect(Math.min(a.x,b.x)*L,(a.y-0.4)*L,Math.abs(a.x-b.x)*L,L*0.8);
            }
        }
        
        ctx.fillStyle="black";
        for(let i = 0 ;i <2;i++){
            const eye_x=(this.cells[0].x+this.eye_dx[this.eye_direction][i]*0.15)*L;
            const eye_y=(this.cells[0].y+this.eye_dy[this.eye_direction][i]*0.15)*L;           
            ctx.beginPath();
            ctx.arc(eye_x,eye_y,L*0.05,0,Math.PI*2);
            ctx.fill();
        }
    }
}