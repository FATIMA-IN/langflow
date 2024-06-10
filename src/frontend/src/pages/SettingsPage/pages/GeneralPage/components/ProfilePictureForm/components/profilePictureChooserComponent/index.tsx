import { useEffect, useRef, useState } from "react";
import useAlertStore from "../../../../../../../../stores/alertStore";
import { gradients } from "../../../../../../../../utils/styleUtils";
import useGetProfilePictures from "./hooks/use-get-profile-pictures";
import { Label } from "../../../../../../../../components/ui/label";
import {
  BACKEND_URL,
  BASE_URL_API,
} from "../../../../../../../../constants/constants";
import HorizontalScrollFadeComponent from "../../../../../../../../components/horizontalScrollFadeComponent";
import LoadingComponent from "../../../../../../../../components/loadingComponent";
import Loading from "../../../../../../../../components/ui/loading";
import { cn } from "../../../../../../../../utils/utils";
import { Button } from "../../../../../../../../components/ui/button";
import { useDarkStore } from "../../../../../../../../stores/darkStore";

type ProfilePictureChooserComponentProps = {
  profilePictures: { [key: string]: string[] };
  loading: boolean;
  value: string;
  onChange: (value: string) => void;
};

export default function ProfilePictureChooserComponent({
  profilePictures,
  loading,
  value,
  onChange,
}: ProfilePictureChooserComponentProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const dark = useDarkStore((state) => state.dark);

  useEffect(() => {
    if (value && ref) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [ref]);

  return (
    <div className="flex flex-col justify-center gap-2">
      {loading ? (
        <Loading />
      ) : (
        Object.keys(profilePictures).map((folder, idx) => (
          <div className="flex flex-col gap-2">
            <div className="edit-flow-arrangement">
              <span className="font-normal">{folder}</span>
            </div>
            <div className="block overflow-hidden">
              <div className="flex items-center gap-1 overflow-x-auto rounded-lg bg-background px-1 custom-scroll">
                {profilePictures[folder].map((path, idx) => (
                  <Button
                    ref={value === folder + "/" + path ? ref : undefined}
                    size="none"
                    variant="none"
                    onClick={() => onChange(folder + "/" + path)}
                    className="shrink-0 px-0.5 py-2"
                  >
                    <img
                      key={idx}
                      src={`${BACKEND_URL.slice(
                        0,
                        BACKEND_URL.length - 1,
                      )}${BASE_URL_API}files/profile_pictures/${folder + "/" + path}`}
                      style={{
                        filter:
                          value === folder + "/" + path
                            ? dark
                              ? "drop-shadow(0 0 0.3rem rgb(255, 255, 255))"
                              : "drop-shadow(0 0 0.3rem rgb(0, 0, 0))"
                            : "",
                      }}
                      className={cn("h-12 w-12")}
                    />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}