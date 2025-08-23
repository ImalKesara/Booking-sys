class ModalState{
   public value  = $state<boolean>();
   constructor(modalState: boolean){
      this.value = modalState;
   }
   setTrue(){
      this.value = true;
   }
   setFalse(){
      this.value = false;
   }
   toggle(){
      this.value = !this.value;
   }
}

export const deleteSlot = new ModalState(false)