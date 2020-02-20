class CurrencyConversionsController < ApplicationController
  # Strong params not allowing params other than permitted
  before_action :currency_params, only: [:get_currency_history]
  ALL_CURRENCIES = ConversionRate.get_all_supported_currencies

  def index
    respond_to do |format|
      format.html
      format.json
    end
  end

# Utility Action to get the currency history of a base currency during a provided time period
  def get_currency_history
    conversion_rate = ConversionRate.new(@params) if @params[:currency].present?
    get_conversion_rate = conversion_rate.get_conversion_rate if conversion_rate.present?
    render :json => get_conversion_rate
  end

  private

  def currency_params
    @params = params.permit(:currency, :start_date, :end_date)
  end
end