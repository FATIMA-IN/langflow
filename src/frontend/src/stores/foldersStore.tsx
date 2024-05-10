import { create } from "zustand";
import { getFolderById, getFolders } from "../pages/MainPage/services";
import { FoldersStoreType } from "../types/zustand/folders";

export const useFolderStore = create<FoldersStoreType>((set, get) => ({
  folders: [],
  getFoldersApi: () => {
    if (get().folders.length === 0) {
      get().setLoading(true);
      getFolders().then(
        (res) => {
          set({ folders: res });
          get().setLoading(false);
        },
        () => {
          set({ folders: [] });
          get().setLoading(false);
        },
      );
    }
  },
  setFolders: (folders) => set(() => ({ folders: folders })),
  loading: false,
  setLoading: (loading) => set(() => ({ loading: loading })),
  getFolderById: (id) => {
    get().setLoadingById(true);
    if (id) {
      getFolderById(id).then(
        (res) => {
          set({ selectedFolder: res });
          get().setLoadingById(false);
        },
        () => {
          get().setLoadingById(false);
        },
      );
    }
  },
  selectedFolder: [],
  loadingById: false,
  setLoadingById: (loading) => set(() => ({ loadingById: loading })),
}));