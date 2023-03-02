import VuiBox from "components/VuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Dashboard from "layouts/dashboard";
import { DocumentGenerator } from "layouts/webapp/DocumentGenerator";
//import ContentStore from "stores/ContentStore";

const Chatbot = () =>
{
    //const store = new ContentStore();
    useEffect(() => console.log(store.getContent()), [])
    return (
        <DashboardLayout>
            {/* <DashboardNavbar /> */}
            <VuiBox py={3} height={810} marginBottom={5}>
                <VuiBox
                    p={3}
                    height={810}
                    bgColor="light"
                    borderRadius={"lg"}>
                    <DocumentGenerator document={store.getContent()}/>
                </VuiBox>
            </VuiBox>
        </DashboardLayout>
    )
}

export default Chatbot;