import logging.config

def setup_logging(log_config: Dict[str, Any]):
    logging.config.dictConfig(log_config)
