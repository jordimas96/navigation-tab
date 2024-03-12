import { Component } from '@angular/core';
import { PageComponent } from '../page.component';
import { NavigationEnd, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { post } from 'jquery';

@Component({
    selector: 'app-generic-page',
    templateUrl: './generic-page.component.html',
    styleUrls: ['./generic-page.component.scss', '../page.scss']
})
export class GenericPageComponent {

    public url: string = this.router.url.replace(/^\//, "");

    public posts: Array<{ titol: string, text: string }>;

    constructor(
        public m: MainService,
        private router: Router
    ) {
        
    }

    async ngOnInit() {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.url = val.url.replace(/^\//, "");
                
                this.generarPosts();
            }
        });
        this.generarPosts();
    }

    generarPosts() {
        // Generate random post combinations //
        this.posts = [];
        for (let i = 0; i < this.getNumPosts(); i++) {
            let titol = this.getTitol();
            let text = this.getText();
            this.posts.push({ titol, text });
        }
    }

    getNumPosts() { return Math.trunc(Math.random() * 2)+3; }
    getTitol() { return this.titols[Math.trunc(Math.random() * this.titols.length)]; }
    getText() {
        let text = "";
        for (let i = 0; i < Math.trunc(Math.random() * 3) + 2; i++) {
            if (i != 0) text += "\n\n";
            text += this.getParagraf();
        }
        return text;
    }
    getParagraf() { return this.texts[Math.trunc(Math.random() * this.texts.length)]; }

    public titols = [
        "Curabitur porta",
        "Duis eleifend",
        "Aenean commodo libero",
        "Suspendisse pharetra lacus",
        "Praesent ut urna",
        "Etiam dignissim felis",
        "Vivamus ut dolor",
        "Aliquam a ante",
        "Proin consequat ex",
        "Fusce aliquam justo",
        "Fusce at diam",
        "In suscipit eros",
        "Phasellus eget eros",
        "Donec in ligula",
        "Mauris eget ligula",
        "Cras in sapien",
        "Duis egestas ligula",
        "Sed et risus",
        "Mauris a ipsum",
        "Cras ullamcorper odio",
        "Suspendisse hendrerit elit",
        "Nam euismod velit",
        "Nunc vitae mi",
        "Aenean ut lectus",
        "Aliquam vulputate magna",
        "Sed ut ipsum",
        "In dignissim mi",
        "Phasellus eget odio",
        "Proin finibus ipsum",
        "In lobortis nibh",
        "Cras eget quam",
        "Etiam et tortor",
        "Morbi feugiat diam",
        "Integer ac ex",
    ];
    public texts = [
        "Nulla a erat dignissim, varius urna quis, viverra risus. Suspendisse malesuada nec magna a feugiat. Pellentesque lacinia tempus metus. Ut ex purus, cursus convallis dolor ut, condimentum pretium lacus. Nullam risus lacus, pretium in egestas a, dictum vitae velit. Nulla et leo quis justo posuere ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        "Mauris odio tellus, efficitur id lorem quis, faucibus tincidunt dolor. Pellentesque lobortis est nec augue gravida hendrerit. Aenean elit velit, imperdiet non quam id, sodales consequat dolor. Aenean eleifend mollis ipsum, eget elementum justo eleifend quis. Mauris quis tincidunt sem. Praesent eget nulla auctor, fringilla lectus in, ornare nulla. Morbi eu erat mi. Nam ac porta nunc, dictum tincidunt arcu. Proin lectus nulla, vestibulum vel accumsan vitae, tempor eu nunc. Aliquam vel nunc rutrum diam auctor viverra vel egestas mauris. Nulla facilisi. In libero tortor, finibus a velit nec, maximus sollicitudin enim. Maecenas euismod ut sapien ut tempus. Aliquam semper turpis sed porttitor dapibus.",
        "In nunc arcu, cursus quis euismod id, tristique sit amet est. Nunc sed elementum elit. Praesent odio orci, facilisis tincidunt tristique at, suscipit id libero. Maecenas vestibulum risus nec diam dignissim, sed consequat dui consequat. Curabitur accumsan commodo ligula ac cursus. Phasellus ac sagittis eros, quis interdum augue. Vestibulum commodo mattis velit, in congue velit. Pellentesque tincidunt finibus dolor, sit amet rutrum lorem tincidunt sed. Pellentesque semper a lacus id tempus. Cras et massa scelerisque, faucibus velit vitae, consequat metus. Ut fermentum neque id lorem scelerisque finibus. Quisque non lectus ac mauris mattis convallis. Aliquam facilisis est lectus, nec dictum mauris mollis ut. Aliquam tincidunt tincidunt sem, eu molestie sem auctor et. Donec ornare volutpat varius. Vestibulum nec gravida augue.",
        "Duis porta egestas massa eu imperdiet. Nulla vitae massa ac risus bibendum cursus nec et augue. Sed pulvinar ut sem quis tempor. Donec porta ac turpis quis porta. Aliquam auctor, ex vel pharetra pretium, erat eros vulputate justo, vitae iaculis urna metus vitae mauris. Donec interdum mauris vel commodo interdum. Etiam ultrices lacus eu ex aliquam, sit amet pulvinar est vestibulum. Duis euismod est ac nisl condimentum imperdiet. Nam ex est, consequat sed sollicitudin non, facilisis sollicitudin nisl.",
        "Aenean et arcu in tortor ultrices finibus in a dolor. Fusce sit amet quam neque. In hac habitasse platea dictumst. Integer egestas posuere sem, ut commodo nunc rhoncus vel. Maecenas tincidunt a arcu id ornare. Cras ac magna tellus. Phasellus ultrices nisi a nunc feugiat congue. In feugiat odio eget dolor pharetra, ac ultrices nunc maximus. Proin in interdum sem, id egestas nisl. Suspendisse fermentum posuere sapien, volutpat dapibus dolor condimentum nec. Sed nec lorem sodales, mattis sem blandit, hendrerit leo. Cras interdum orci sed sem dapibus, eget facilisis ex dapibus.",
        "Aliquam non velit sollicitudin, gravida sem eget, molestie lectus. Nunc dignissim, metus elementum pharetra mollis, ligula dui congue ipsum, sed fermentum mauris est quis lectus. Vestibulum ut mauris venenatis, interdum nunc sed, pretium ipsum. Phasellus pellentesque tempus diam, quis ullamcorper leo gravida quis. Ut ullamcorper ipsum dolor, ut eleifend libero viverra maximus. Praesent eu nibh blandit, sodales massa vitae, efficitur nulla. Sed pretium velit urna, sed tincidunt metus dignissim nec. Vestibulum efficitur tortor sit amet euismod fringilla. Nam suscipit, tellus in laoreet venenatis, metus risus porttitor dolor, vel tristique magna felis vel ante. Proin maximus tortor ante, in ultricies urna posuere a. Nam vel est et risus condimentum cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi maximus nibh a diam sagittis venenatis malesuada nec sapien. Aenean condimentum, augue non feugiat convallis, diam mauris ullamcorper justo, vel molestie arcu urna quis metus.",
        "Morbi semper nunc arcu, eu feugiat leo molestie sed. Sed ornare mattis tempus. Mauris fringilla tristique scelerisque. Vestibulum egestas bibendum consequat. Suspendisse tortor lorem, posuere mollis pretium sed, pulvinar eu enim. Integer pellentesque libero ac viverra commodo. Nunc nec dolor eget diam congue sagittis. Sed luctus urna sed purus commodo, eu pharetra sem pretium. Sed ut consequat purus. Phasellus tincidunt tellus at eleifend faucibus.",
        "Donec sem orci, viverra eget efficitur a, euismod at nisi. Nunc lacus quam, gravida vitae erat vitae, condimentum blandit ligula. Nullam vitae sem et tellus tempor sollicitudin. Ut est ante, ullamcorper eget cursus quis, ornare eget mauris. Curabitur dictum, nibh vel vehicula tempus, felis dolor iaculis nulla, in suscipit urna nulla in velit. Suspendisse auctor magna nisl, ornare lobortis libero consectetur at. Vivamus elementum turpis vitae eros laoreet convallis.",
        "Maecenas id hendrerit lacus. Pellentesque vel dui dolor. Sed interdum ornare lorem in interdum. Praesent sed ligula a orci gravida ullamcorper. Pellentesque fermentum tempor urna, ac sollicitudin neque euismod sed. Aenean in mi sed justo pharetra dapibus. Etiam eget elit vitae urna facilisis posuere non ut nisl. Praesent quis velit magna.",
        "Nulla nec lacus nec velit tempus commodo sit amet at eros. Vestibulum leo nunc, sagittis et sagittis a, tempus nec magna. Praesent porta enim tempus enim auctor, nec mattis massa rutrum. Nam justo ipsum, dapibus in dolor sit amet, tempus lacinia ipsum. Morbi scelerisque ipsum vel mattis commodo. Nunc dictum est in nulla venenatis fermentum. Pellentesque elementum diam nec iaculis condimentum. Donec pulvinar arcu vel neque laoreet blandit. Nullam at leo tellus. Proin consequat in mi et iaculis.",
        "Cras suscipit justo dui, in facilisis lorem laoreet vel. Phasellus ac turpis vitae lorem gravida tempor. Pellentesque egestas nibh a urna ornare egestas. Proin dictum eros vel quam porta, in mattis quam bibendum. Nullam cursus vehicula magna, at rhoncus nunc vehicula et. Sed porttitor faucibus sapien ut molestie. Phasellus iaculis scelerisque erat id faucibus. Aenean mattis, felis elementum volutpat finibus, nisi tellus auctor diam, eget convallis lorem ex nec diam.",
        "Donec vitae sodales leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean interdum id ipsum sed pharetra. In nisl ligula, tincidunt non blandit vitae, posuere a velit. Duis ac tortor lorem. Donec sapien sapien, placerat sed euismod id, pulvinar eget ligula. In varius ultrices augue, vitae sodales justo dignissim nec. Phasellus lacus dolor, rutrum ac lacinia sit amet, luctus non ex. Nullam elementum hendrerit ligula, nec blandit lorem.",
        "In eget vestibulum arcu. In in nisl rutrum, suscipit justo id, auctor nisl. Phasellus at consectetur leo. Praesent vel nunc odio. Aenean ut odio vel risus mattis euismod. Ut quis porttitor sem. Pellentesque non porta tellus. Nam efficitur justo velit, a placerat elit eleifend sit amet.",
        "Aliquam erat volutpat. Morbi dignissim suscipit nulla et pharetra. Sed blandit nibh vitae turpis maximus, id rhoncus ligula sodales. Etiam vitae varius tellus. Nulla facilisi. Curabitur lacus lorem, tempus a feugiat lacinia, pharetra ut libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eu diam lobortis, scelerisque urna tincidunt, placerat nisi. Sed cursus purus ac consectetur interdum. Aliquam lacinia imperdiet velit at malesuada.",
        "Integer faucibus mi vel lacinia molestie. Nunc metus lectus, luctus a rhoncus nec, cursus eget quam. Vivamus nunc odio, aliquam ut ligula semper, ultricies condimentum neque. Nulla porta accumsan felis, non aliquet odio sollicitudin in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec posuere augue a neque efficitur, faucibus ullamcorper felis sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Praesent dictum risus eu faucibus convallis. Donec vel purus ut dolor faucibus suscipit. Fusce efficitur lacus vel mauris aliquet, a aliquet purus blandit. Duis aliquet ultricies dui, et sollicitudin ipsum consequat sed. Donec vulputate lacinia sagittis. Fusce at quam posuere, tincidunt nulla sit amet, vehicula est.",
        "Morbi eu sollicitudin nisi. Vestibulum dictum rhoncus justo eu commodo. Nunc nec euismod elit, eu varius metus. Integer laoreet suscipit sem sit amet feugiat. Curabitur eleifend velit ut magna ullamcorper imperdiet. Curabitur finibus, ipsum feugiat dapibus suscipit, dolor mi dignissim purus, a sollicitudin nibh turpis eu tortor. Integer orci justo, blandit vel posuere sit amet, sodales ac massa. Etiam eleifend, diam eget lacinia pulvinar, tellus velit finibus nisi, in aliquet lectus massa in augue. Ut molestie erat ut diam fermentum, aliquet accumsan sem eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem nibh, fringilla a feugiat nec, tincidunt vitae ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam bibendum tristique velit. Fusce in elementum tortor. Phasellus ac est ante. Sed massa eros, elementum in libero feugiat, fermentum varius diam.",
        "Vestibulum id dui leo. Aenean volutpat massa facilisis porttitor ullamcorper. Etiam id posuere metus. Vivamus sit amet tellus nec lorem fermentum fringilla eget sed ex. Vivamus mi nibh, porttitor nec cursus ac, dapibus vel tortor. Mauris placerat arcu sit amet leo lacinia, a cursus eros euismod. Curabitur vel eleifend ligula. Aenean auctor, sapien in porta ultrices, purus enim gravida mauris, vehicula placerat lorem turpis in neque. In tincidunt orci a ipsum tincidunt euismod. Pellentesque mattis risus nec risus suscipit, ut dictum justo euismod.",
        "Nam commodo rhoncus cursus. Phasellus posuere erat ac molestie porttitor. Proin mi nisi, rhoncus in tempor ut, euismod lobortis urna. Morbi maximus ut mi ac mattis. Vestibulum eget vestibulum magna. Ut gravida, enim a ultrices gravida, lacus neque tempor lectus, sit amet tempor magna sem in neque. Duis orci lorem, hendrerit ac gravida ut, finibus id neque. Morbi rhoncus rutrum massa ac ullamcorper. Etiam sodales nunc ac porta ultricies. Curabitur et gravida dolor, id ornare est. Donec laoreet dolor et massa vulputate, eu congue nulla accumsan. Nulla aliquam lacus in dictum malesuada. Nullam hendrerit mauris commodo metus luctus hendrerit. Etiam porttitor dui augue, sit amet tincidunt magna pellentesque in. Vivamus bibendum orci ut odio tristique, nec suscipit eros aliquet. Curabitur porttitor purus ut vestibulum consectetur.",
        "Sed ut vulputate erat. Integer accumsan urna vitae felis convallis, non ullamcorper quam gravida. Cras ut elit mattis, sagittis arcu in, lacinia massa. Aliquam eu sapien lorem. Vivamus accumsan risus quis bibendum mattis. Nulla sit amet pretium diam, et elementum libero. Aenean in arcu eu enim rhoncus scelerisque. Donec facilisis quis diam aliquam auctor. Cras iaculis ultrices nulla. Morbi vulputate tortor non rutrum tincidunt. Ut congue metus eget metus pretium lacinia. Sed pellentesque enim ligula, non rhoncus magna suscipit hendrerit. Nulla facilisi. Maecenas congue in elit in consectetur. Nunc commodo justo eget est porttitor, quis efficitur tortor hendrerit.",
        "Fusce egestas nisl eget nisi mollis, eget fringilla odio commodo. Integer volutpat, velit ut euismod aliquet, lectus dolor tincidunt leo, nec rutrum lacus sem ac turpis. Aenean volutpat id ipsum hendrerit dictum. Donec varius dolor ut aliquam fermentum. Nam eu leo consectetur, placerat erat tempus, maximus leo. Proin eu diam erat. Nullam tempor sapien et varius rutrum. Sed quis dictum lectus. Fusce gravida velit congue sapien dignissim ultrices. Morbi euismod leo dui, ac rhoncus libero hendrerit quis. Suspendisse consectetur mauris condimentum neque ultrices, a congue diam mattis. Etiam leo enim, aliquet a pulvinar id, rhoncus ac nibh. Etiam sed diam et arcu consequat ullamcorper at at ligula.",
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent id porta lectus. Aliquam erat volutpat. Mauris non lectus iaculis, aliquam eros id, dictum magna. Proin finibus lobortis tellus, vel congue turpis tincidunt eu. Mauris imperdiet neque vitae lacus fermentum suscipit. Nam ipsum eros, eleifend id est ut, viverra varius nisl. Proin euismod vitae massa quis fringilla. Phasellus facilisis sem sit amet rhoncus ultrices. Sed pharetra viverra velit. Curabitur venenatis, mi at varius rutrum, magna nibh faucibus diam, et auctor justo ante eu arcu. Mauris erat nisl, fermentum quis magna luctus, sodales congue tortor. Duis in mattis justo, in interdum velit.",
        "Quisque ut lectus sit amet orci vulputate tincidunt ut sed lorem. Nam luctus tristique nunc vitae aliquam. Morbi egestas faucibus pretium. Nulla ac eleifend mi, at semper tellus. Pellentesque fermentum ipsum tellus, eget pulvinar quam condimentum ut. Ut et faucibus urna, non eleifend mi. Aliquam enim turpis, molestie ut tortor vel, euismod finibus nisl. Mauris sit amet rutrum nisi. Vivamus eu metus id purus consequat vestibulum.",
        "Nulla sed enim ac urna tincidunt congue. Nulla tempor, lacus vel varius consectetur, libero sem fermentum mi, sit amet ornare eros ligula nec odio. Sed vitae sagittis odio. Donec bibendum mi a sollicitudin gravida. Vestibulum sodales mattis sem, at commodo elit venenatis sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut rutrum ut lorem sed convallis. Aliquam vitae varius metus, in malesuada ante. Curabitur rhoncus accumsan massa. Aliquam ullamcorper ornare urna non consequat. Nullam luctus mauris vel maximus tincidunt.",
        "Pellentesque vitae efficitur nisl, ut blandit nunc. Sed est ex, rutrum non quam id, lacinia pulvinar magna. In in justo vehicula, pharetra augue eget, ornare elit. Cras convallis consectetur auctor. Cras ultricies interdum nulla quis posuere. Nullam sed mauris eget enim efficitur aliquam. Integer lobortis ipsum turpis, sed efficitur odio feugiat in. Sed eu volutpat justo. Phasellus convallis orci nibh, a semper leo eleifend non. Sed consectetur gravida dignissim.",
        "Pellentesque ullamcorper finibus sapien, eget scelerisque elit suscipit vel. Vestibulum luctus accumsan tempor. Ut sed finibus mi, vel blandit ipsum. Curabitur vel bibendum enim. Proin ultrices placerat nisl ac interdum. In neque lacus, efficitur at tortor mollis, scelerisque mattis sem. Aliquam vehicula convallis magna vitae rhoncus. Sed sagittis risus id nunc rhoncus volutpat. In dui sapien, semper at maximus ac, sagittis eu felis. Integer fermentum mattis sem sit amet lacinia.",
        "In interdum ante id mattis faucibus. Aenean est lectus, tincidunt at nibh eget, accumsan tincidunt orci. Etiam nec imperdiet turpis, in maximus augue. Donec at bibendum risus, ut posuere lacus. Sed a ultricies arcu. In hac habitasse platea dictumst. Phasellus arcu felis, interdum quis nulla eu, interdum ullamcorper sapien. Nulla pellentesque nunc nec quam rhoncus, sed efficitur metus fringilla. Sed mollis turpis urna, non consectetur metus ultrices a. Morbi porttitor, leo vel congue volutpat, augue ex mollis mauris, a scelerisque lectus ante sed ligula. Mauris et libero vel neque consequat bibendum at vitae diam. Aliquam dictum a magna at ullamcorper. Pellentesque et viverra felis. Etiam maximus, purus et blandit blandit, lorem mi lacinia magna, vel facilisis purus ligula eu leo. Sed sodales arcu leo. In quis sodales dolor.",
        "In ullamcorper leo id maximus posuere. Nunc scelerisque sagittis erat sed accumsan. Praesent blandit tellus arcu. Quisque libero elit, imperdiet nec eros sit amet, tincidunt vehicula metus. Proin ut nisi eget tortor blandit dignissim. Nam tincidunt sapien id lorem aliquam volutpat. Suspendisse pharetra tempor elit, volutpat rutrum purus feugiat at. Pellentesque in venenatis dolor. Morbi faucibus dapibus eros, nec rutrum dolor hendrerit sed. Nam non scelerisque quam. Nunc pellentesque, metus vitae condimentum vestibulum, lacus quam feugiat erat, ac iaculis mauris massa et leo. Aliquam erat volutpat. Praesent volutpat, odio sed ullamcorper pretium, ante ante fringilla nisi, ac luctus quam augue vel enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim nibh aliquam ante vestibulum, non scelerisque purus placerat. In id augue sit amet orci feugiat dignissim.",
        "Ut ac ex felis. Vestibulum leo odio, tempus vitae tincidunt sit amet, tempus vitae tellus. Mauris egestas, lectus eu lacinia fringilla, mi nulla commodo velit, eu tincidunt est neque et velit. Nulla vitae mauris ac risus posuere eleifend id at risus. Morbi fringilla, turpis id finibus malesuada, sem purus finibus lorem, non fermentum arcu turpis a lorem. Integer quis dolor eu elit faucibus pharetra vel ut lorem. Fusce tempus varius sem, in condimentum nibh auctor sed.",
        "Nulla in ante dolor. Etiam consectetur tellus orci, a tempus nulla ultrices ac. Quisque ut nisl porttitor, malesuada nulla in, ullamcorper nunc. Ut vel ex egestas, posuere nunc eu, consequat tellus. Ut ut fringilla tellus, vitae dictum velit. Nulla maximus odio eget lacinia pellentesque. Sed dui ante, maximus non semper eget, pharetra eget purus.",
        "Maecenas eget magna augue. Quisque vestibulum justo nunc, id varius dolor fermentum interdum. Aliquam placerat arcu eu tempus porta. Nam vel dolor mauris. Sed viverra nisi ut lorem vulputate egestas. Maecenas odio sapien, lobortis ac semper vitae, efficitur vel ante. Integer blandit pulvinar libero vitae condimentum. Aenean felis risus, tempus sit amet tellus vitae, euismod rutrum quam. Nullam pulvinar libero ut tempus finibus. Proin convallis neque a sapien tincidunt iaculis. Suspendisse potenti. Fusce quis malesuada magna, vitae lacinia libero.",
        "Nullam tempus turpis ac sem volutpat cursus. Duis ullamcorper, enim pretium ultrices lacinia, ipsum ante luctus nisi, id dictum nibh massa in urna. Aenean tincidunt posuere est, vel accumsan nunc pretium id. Vestibulum sed consectetur nibh. Nulla cursus sem urna, eu efficitur quam dignissim lacinia. Donec id lorem hendrerit nunc cursus sagittis ut id justo. Curabitur ligula dolor, dignissim nec lorem ac, ullamcorper varius turpis. Nulla nec pellentesque massa. Aenean vitae massa vulputate, lobortis urna sit amet, feugiat felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras nunc lorem, cursus auctor nibh eget, auctor hendrerit felis. Curabitur viverra erat vel ex viverra, et efficitur lectus elementum. Ut in neque ut risus auctor porta eu sed leo. Quisque elit velit, lacinia et ipsum nec, volutpat accumsan nulla.",


    ];

}
