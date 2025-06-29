
import { useToast as useToastOriginal, toast } from "@/hooks/use-toast";

export { toast };

export function useToast() {
  return useToastOriginal();
}
