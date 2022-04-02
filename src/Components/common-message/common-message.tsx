import { useSelector } from "../../services/hooks";

export default function CommonMessage() {
    const authMessage = useSelector(state => state.auth.authMessage);
    return (
        <p className="text text_type_main-default pt-15 pb-2">{authMessage}</p>
    )

}