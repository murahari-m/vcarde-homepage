/** Laravel + reCAPTCHA move DOM nodes React still thinks it owns. */
export function installDomGuard() {
  if (typeof Node === "undefined") return;
  const proto = Node.prototype as Node & { __vcardeSafe?: boolean };
  if (proto.__vcardeSafe) return;
  const orig = proto.removeChild.bind(proto) as typeof Node.prototype.removeChild;
  proto.removeChild = function (this: Node, child: Node) {
    if (child.parentNode !== this) return child;
    return orig.call(this, child);
  } as typeof Node.prototype.removeChild;
  proto.__vcardeSafe = true;
}
