import type { ConfigItem } from '@/types/common'

export const useConfig = (data: ConfigItem[]) => {
  const t = (configKey: string) => {
    const configItem = data.find((item: ConfigItem) => item.config_key === configKey)
    return configItem ? configItem.config_content : ''
  }
  return t
}
