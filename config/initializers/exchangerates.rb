config = YAML.load_file(Rails.root + "config/exchangerates.yml")[Rails.env]
Rails.configuration.exchangerates_api = config["public_url"]
