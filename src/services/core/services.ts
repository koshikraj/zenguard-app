import React from "react";
import { StorageServiceImpl } from "../storage/storage.service.impl";

export const storageService = new StorageServiceImpl();
class Services {
  storageService: StorageServiceImpl = new StorageServiceImpl();
}

const services = new Services();
export const ServicesContext = React.createContext<Services>(services);
export const useServices = () => React.useContext(ServicesContext);
