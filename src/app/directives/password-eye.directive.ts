import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appPasswordEye]"
})
export class PasswordEyeDirective {

  private flag: boolean = false;
  private tagI;

  constructor(private renderer: Renderer2,
              private el: ElementRef,
  ) {
    this.setup();
  }

  setup(): void {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement("span");
    this.renderer.addClass(span, "auth-eye");

    this.tagI = document.createElement("i");
    this.renderer.addClass(this.tagI, "fas");
    this.renderer.addClass(this.tagI, "fa-eye-slash");

    this.renderer.appendChild(span, this.tagI);
    this.renderer.appendChild(parent, span);

    this.tagI.addEventListener("click", () => {
      this.toggleEye();
    });
  }

  toggleEye(): void {
    this.flag = !this.flag;

    if (this.flag) {
      this.renderer.removeClass(this.tagI, "fa-eye-slash");
      this.renderer.addClass(this.tagI, "fa-eye");
      this.renderer.setProperty(this.el.nativeElement, "type", "text");
    } else {
      this.renderer.removeClass(this.tagI, "fa-eye");
      this.renderer.addClass(this.tagI, "fa-eye-slash");
      this.renderer.setProperty(this.el.nativeElement, "type", "password");
    }
  }

}
