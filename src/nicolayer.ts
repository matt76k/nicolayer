import $ = require("jquery");

class Comment {
  public body : JQuery;

  constructor(str: string, n: number) {
    this.body = $(`<span class='nicoComment' id='${ n }'>${ str }</span>`);
  }

  setFontSize(fontsize: string) {
    let scale: number;

    switch (fontsize) {
      case "large":
        scale = 1.2;
        break;
      case "small":
        scale = 0.8;
        break;
      default:
        scale = 1.0;
    }
    
    let size = parseInt(this.body.css("font-size")) * scale;
    this.body.css("font-size", size + "px");
  }

  get left():number { return this.body.position().left }
  get top():number { return this.body.position().top }
  get width():number { return this.body.width() }
  get height():number { return this.body.height() }
}

interface Space {
  y:number;
  w:number;
}

export class NicoLayer {
  private width: number;
  private height: number;
  private count: number;
  private wqueue: Comment[];
  private queue: Comment[];
  public elem: JQuery;

  constructor(el: JQuery) {
    this.elem = el;
    this.width = this.elem.width();
    this.height = this.elem.height();

    this.queue = [];
    this.wqueue = [];
    this.count = 0;
  }

  interval() {
    this.queue = this.queue.filter(i => i.left !== 0);

    while (this.wqueue.length != 0) {
      let l = this.queue.length;
      this.addQueue(this.wqueue.shift());
      if (l == this.queue.length) {
        this.wqueue.unshift(this.wqueue.pop());
        break;
      }
    }
  }

  createComment(command:{size:string;}, str:string) : Comment{
    this.count += 1;
    let comment = new Comment(str, this.count);
    this.elem.append(comment.body);
    comment.setFontSize(command.size);
    return comment;
  }

  view(c:Comment, y:number) {
    let offset = c.body.offset({
      top: y + this.elem.offset().top,
      left: this.width + this.elem.offset().left,
    });

    let animation = offset.animate({left: -c.width }, {
      duration: 3 * (this.width + c.width),
      easing: "linear",
      complete: () => {
        return animation.remove();
      },
    });
  }
  
  searchSpace() :Space[] {
    let filledSpace:Space[] = [];
   

    for (var c of this.queue) {
      if (c.left > this.width - c.width) {
        filledSpace.push({ y: c.top, w: c.height });
      }
    }
    
    filledSpace.sort((i, j) => { return i.y - j.y; });

    let space:Space[] = [];
    let sp:number = 0;

    for (var i of filledSpace) {
      var diff = i.y - sp;
      if (diff != 0)
        space.push({y:sp, w:diff});
      sp = i.y + i.w;
    }

    if (sp != this.height)
      space.push({y:sp, w:this.height - sp});

    return space;
  }

  getPosition(c) : number | null{
    let space = this.searchSpace();
    let pos = space.find((e) => {return e.w > c.height;});

    if (pos != null)
      return pos.y;
    else
      return null;
  }

  addQueue(comment:Comment) {
    let y = this.getPosition(comment);
    if (y != null) {
      this.queue.push(comment);
      this.view(comment, y);
    } else {
      this.wqueue.push(comment);
    }
  }

  send(command, str:string) {
    let c:Comment = this.createComment(command, str);
    this.addQueue(c);
  }
}
