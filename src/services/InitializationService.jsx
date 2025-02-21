import { useEffect, useState } from "react";
import { setSiteColors, setSiteConfiguration } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts, fetchColors, fetchConfigs } from "./ConfigurationService";
import { setBlogPosts } from "../actions/actions";


function InitializationService() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConfigs().then((configs) => {
        const globalConfigs = configs.reduce((acc, section) => {
            const sectionKey = section.key;
            section.value.forEach(({ key, value }) => {
              acc[`${sectionKey}_${key}`] = value;
            });
            return acc;
        }, {});
          
        console.log(globalConfigs);

      dispatch(setSiteConfiguration(globalConfigs));
    });
    fetchColors().then((colors) => {
        const globalColors = colors.reduce((acc, section) => {
            const sectionKey = section.key;
            section.value.forEach(({ key, value }) => {
              acc[`${sectionKey}_${key}`] = value;
            });
            return acc;
        }, {});
          
        console.log(globalColors);
        dispatch(setSiteColors(globalColors));
    });
    fetchBlogPosts().then((posts) => {
        dispatch(setBlogPosts(posts))
    });
  }, []);
  
}

export default InitializationService
