import { useParams } from "react-router-dom";
import { getIdFromSlug } from "../../utils/CommonUtls";
import { useAppSelector } from "../../redux/Hook";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "../example/TabSelector";
import FollowListView from "../listviews/FollowListView";
import PostSavedListView from "../listviews/PostSavedListView";
import FollowerListView from "../listviews/FollowerListView";
import { useTranslation } from 'react-multi-lang'

interface ModalType {
  show: boolean
  onHide: () => void
}
export function CustomizeModalOption(props: Readonly<ModalType>) {
  const { slug } = useParams()
  const userId = getIdFromSlug(slug ?? '')
  const t = useTranslation()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [selectedTab, setSelectedTab] = useTabs([
    "following",
    "follower",
    "saved",
  ]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Menu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>
          <div >
            <nav className="flex border-b border-gray-300">

              {
                userId == userLogin?.id ? <>
                  <TabSelector
                    isActive={selectedTab === "following"}
                    onClick={() => setSelectedTab("following")}
                  >
                    {t('Options.following')}
                  </TabSelector>
                  <TabSelector
                    isActive={selectedTab === "follower"}
                    onClick={() => setSelectedTab("follower")}
                  >
                    {t('Options.follower')}
                  </TabSelector>
                  <TabSelector
                    isActive={selectedTab === "saved"}
                    onClick={() => setSelectedTab("saved")}
                  >
                    {t('Options.postSaved')}
                  </TabSelector>
                </> :
                  <TabSelector
                    isActive={selectedTab === "following"}
                    onClick={() => setSelectedTab("following")}
                  >
                    {t('Options.following')}
                  </TabSelector>
              }

            </nav>
            <div className="p-2">
              <TabPanel hidden={selectedTab !== "following"}><FollowListView id={userId} /></TabPanel>
              <TabPanel hidden={selectedTab !== "follower"}><FollowerListView id={userId} /></TabPanel>
              <TabPanel hidden={selectedTab !== "saved"}><PostSavedListView /></TabPanel>
            </div>
          </div>

        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className='btn' style={{}}>Close</Button>
      </Modal.Footer>
    </Modal>

  );
}
