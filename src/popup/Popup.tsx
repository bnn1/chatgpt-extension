import GithubIcon from "../components/icons/Github/Github";
import TelegramIcon from "../components/icons/Telegram/Telegram";
import useExtensionState from "../hooks/useExtensionState";
import cc from "../lib/utils/cc";
import { updateState } from "../state/extensionState";

function Popup() {
  const { isBulkDeleteEnabled, isChatExportEnabled, isPromptSavingEnabled } =
    useExtensionState();

  const buttons = [
    {
      label: "Bulk Delete",
      enabled: isBulkDeleteEnabled,
      onClick: () => {
        updateState({
          isBulkDeleteEnabled: !isBulkDeleteEnabled,
        });
      },
    },
    {
      label: "Chat Export",
      enabled: isChatExportEnabled,
      onClick: () => {
        updateState({
          isChatExportEnabled: !isChatExportEnabled,
        });
      },
    },
    {
      label: "Prompt Saving",
      enabled: isPromptSavingEnabled,
      onClick: () => {
        updateState({
          isPromptSavingEnabled: !isPromptSavingEnabled,
        });
      },
    },
  ];

  const socials = [
    {
      label: "Github",
      link: "https://github.com/bnn1/chatgpt-extension",
      icon: GithubIcon,
    },
    {
      label: "Telegram",
      link: "https://t.me/barysbarbarys",
      icon: TelegramIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-y-8 w-112 h-96 items-center justify-center prose-xl py-4">
      <h1 className="text-center max-w-sm">ChatGPT Extension</h1>
      <div className="join">
        {buttons.map((button) => (
          <div
            key={button.label}
            className="tooltip"
            data-tip={`Click to ${button.enabled ? "disable" : "enable"}`}
          >
            <input
              type="checkbox"
              checked={button.enabled}
              className={cc("join-item btn w-32 checked:bg-none")}
              onClick={button.onClick}
              name="plugins"
              aria-label={button.label}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-x-4">
        {socials.map((icon) => (
          <a
            href={icon.link}
            className={cc("btn btn-circle")}
            target="_blank"
            rel="noreferrer"
            aria-label={icon.label}
          >
            <icon.icon />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Popup;
