require 'net/http'
require 'json'
#Service to make a http request to exchangeratesapi and get the json object
class ConversionRate
  def initialize (params)
    @currency = params[:currency]
    @start_date = params[:start_date]
    @end_date = params[:end_date]
    @url = "https://api.exchangeratesapi.io/history?start_at=#{@start_date}&end_at=#{@end_date}&base=#{@currency}"
    @uri = URI(@url)
  end

  def get_conversion_rate
    begin
      response = Net::HTTP.get(@uri) if @uri.present?
      response_obj = JSON.parse(response) if response.present?
    rescue
      response_obj[:status] = 'error'
    end
    response_obj['rates']
  end
  #method to get the supported latest currencies by exchangerateapis
  def self.get_all_supported_currencies
    url = "https://api.exchangeratesapi.io/latest"
    url = URI(url)
    response = Net::HTTP.get(url)
    response_obj = JSON.parse(response)
    response_obj["rates"].keys
  end
end