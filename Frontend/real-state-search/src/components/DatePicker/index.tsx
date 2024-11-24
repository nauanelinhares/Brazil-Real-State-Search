import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/pt-br";

export default function BasicDatePicker({
  onChange,
  title,
}: {
  onChange: (date: any) => void;
  title: string;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DemoContainer components={["DatePicker"]}>
        <DatePicker label={title} onChange={onChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
