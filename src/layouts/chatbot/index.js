import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Dashboard from "layouts/dashboard";
import { DocumentGenerator } from "layouts/webapp/DocumentGenerator";
//import ContentStore from "stores/ContentStore";
import useState from "react";

const Chatbot = () =>
{
    const [messages, setMessages] = useState([]);
    //const store = new ContentStore();
    return (
        <DashboardLayout>
            {/* <DashboardNavbar /> */}
            <VuiBox py={3} marginBottom={5} bgColor="light"
                    borderRadius={"lg"}
                    >
                <VuiBox
                    p={3}
                    display="flex"
                    >
                    <VuiBox width="50%">
                        <DocumentGenerator document={JSON.parse(localStorage.getItem("content"))}/>
                    </VuiBox>
                    <VuiBox width="50%">
                        Insert chatbot here
                    </VuiBox>
                </VuiBox>
                <VuiBox display="flex" justifyContent="flex-end" gap={3} m={3}>
                    <VuiButton color="info">
                        Save
                    </VuiButton>
                    <VuiButton color="dark">
                        Cancel
                    </VuiButton>
                </VuiBox>
            </VuiBox>
        </DashboardLayout>
    )
}

export default Chatbot;