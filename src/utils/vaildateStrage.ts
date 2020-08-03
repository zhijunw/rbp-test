import { Dictionary } from '@/typings'
interface ValidateArgs {
  value: string
  message?: string
}
class ValidataStrage {
   private currentState = {}
   private strage = {
     isMobile: function(args: ValidateArgs): any {
       if (!/(^1[3|5|8][0-9]{9}$)/.test(args.value)) {
         return args.message || '输入正确的电话号码'
       }
     },
     isCode: function(args: ValidateArgs): any {
       if (!/[^\u4e00-\u9fa5]/.test(args.value)) {
         return args.message || '请输入正确的编码'
       }
     },
     isPostcode: function(args: ValidateArgs): any {
       if (!/^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/.test(args.value)) {
         return args.message || '请输入正确的邮政编码'
       }
     }

   }
   // eslint-disable-next-line no-useless-constructor
   constructor() {

   }

   changeState(...args: (string | number)[]) {
     this.currentState = {}
     if (args.length) {
       for (let i = 0; i < args.length; i++) {
         this.currentState[args[i]] = true
       }
     }
     return this
   }
   goes(args: Dictionary) {
     //  console.log(' this.currentState', this.currentState, args)
     for (const k in this.currentState) {
       if (this.strage[k]) {
         const msg = this.strage[k](args[k])
         //  return this.strage[k](args[k])
         if (msg) return msg
       }
     }
     //  return this
   }
}
export default ValidataStrage
