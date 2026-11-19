// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("ConfermaStatoRiconciliazione");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("ConfermaStatoRiconciliazione");
import { Button, Dialog, Field, useTable, type ConfirmProps } from "../floware";

export default function ConfermaStatoRiconciliazione({ action, confirm, cancel }: ConfirmProps) {__mk();
  const table = useTable(action.pageId);
  const codice = table && table.column("Codice pratica") >= 0 ? table.value(action.row, "Codice pratica") : "";
  const attuale = action.from ?? (table && table.column("Esito") >= 0 ? table.value(action.row, "Esito") : "Non disponibile");
  return (
    <Dialog title="Confermi il cambio di stato?" onClose={cancel} footer={<><Button variant="secondary" onClick={cancel} autoFocus>Annulla</Button><Button variant="primary" onClick={confirm}>Conferma</Button></>}>
      <div className="space-y-4">
        {codice && <Field label="Codice pratica">{codice}</Field>}
        <Field label="Stato attuale"><strong>{attuale}</strong></Field>
        <Field label="Stato selezionato"><strong>{action.to ?? "Non disponibile"}</strong></Field>
        <p className="text-(--mk-muted)">Lo stato sarà aggiornato solo dopo la conferma.</p>
      </div>
    </Dialog>
  );
}
