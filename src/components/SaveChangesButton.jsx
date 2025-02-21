import { useDispatch, useSelector } from "react-redux";
import { updateColorsInFirestore, updateConfigsInFirestore } from "../services/FirestoreService";
import { Button, CircularProgress } from "@mui/material";
import { setAlert, setIsButtonLoad } from "../actions/actions";

function SaveChangesButton() {
  const dispatch = useDispatch();
  const siteConfigurations = useSelector(state => state.siteConfigurations);
  const siteColors = useSelector(state => state.siteColors);
  const isButtonLoad = useSelector((state) => state.isButtonLoad);

  const updateFirestore = async () => {
    try {
      dispatch(setIsButtonLoad(true));

      const updatedConfigs = Object.keys(siteConfigurations).reduce((acc, key) => {
        const [sectionKey, fieldKey] = key.split("_");

        let section = acc.find(item => item.key === sectionKey);
        if (!section) {
          section = { key: sectionKey, value: [] };
          acc.push(section); 
        }

        section.value.push({ key: fieldKey, value: siteConfigurations[key] });

        return acc;
      }, []);

      const updatedColors = Object.keys(siteColors).reduce((acc, key) => {
        const [sectionKey, fieldKey] = key.split("_");

        let section = acc.find(item => item.key === sectionKey);
        if (!section) {
          section = { key: sectionKey, value: [] };
          acc.push(section); 
        }
        section.value.push({ key: fieldKey, value: siteColors[key] });

        return acc;
      }, []);
      
      await Promise.all([
        updateConfigsInFirestore(updatedConfigs),
        updateColorsInFirestore(updatedColors),
      ]);

      dispatch(setIsButtonLoad(false));

      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'success'));
      dispatch(setAlert('message', 'Changes saved successfully.'));
    } catch (error) {
      dispatch(setIsButtonLoad(false));
      console.error("Error saving changes:", error);
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', 'There was a problem saving your changes.'));
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={updateFirestore}
      sx={{
        color: siteColors.auth_submitButtonText,
        backgroundColor: siteColors.auth_submitButtonBackground,
        marginBottom: 2,
        marginTop: 2,
        width: '85%',
        '&:hover': {
          backgroundColor: siteColors.auth_submitButtonHover,
        },
      }}
    >
      {isButtonLoad ? <CircularProgress size="22.5px" sx={{ color: '#fff' }} /> : 'Save Changes'}
    </Button>
  );
}

export default SaveChangesButton;
