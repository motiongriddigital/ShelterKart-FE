import { create } from 'zustand';

export type ModalId =
  | 'guideModal'
  | 'principlesModal'
  | 'tncModal'
  | 'privacyModal'
  | 'methodModal'
  | 'disputeModal'
  | 'restoreModal'
  | 'replyModal'
  | 'payModal';

type ModalState = {
  openId: ModalId | null;
  open: (id: ModalId) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  openId: null,
  open: (openId) => set({ openId }),
  close: () => set({ openId: null }),
}));
