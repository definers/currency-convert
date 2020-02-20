class CurrencyConversionsController < ApplicationController
  before_action :currency_params, only: [:get_currency_history]
  ALL_CURRENCIES = ['AFN', 'ALL', 'DZD', 'AOA', 'ARS', 'AMD', 'AWG', 'AUD', 'AZN', 'BSD', 'BHD', 'BDT', 'BBD', 'BYR', 'BZD', 'BMD', 'BTN', 'BOB',
                    'BAM', 'BWP', 'BRL', 'BND', 'BGN', 'BIF', 'KHR', 'CAD', 'CVE', 'KYD', 'CLP', 'CNY', 'COP', 'XOF', 'XAF', 'CFA',
                    'KMF', 'XPF', 'CDF', 'CRC', 'HRK', 'CUC', 'CUP', 'CZK', 'DKK', 'DJF', 'DOP', 'XCD', 'EGP', 'SVC', 'ERN', 'ETB', 'EUR',
                    'FKP', 'FJD', 'GMD', 'GEL', 'GHS', 'GIP', 'GTQ', 'GGP', 'GNF', 'GYD', 'HTG', 'HNL', 'HKD', 'HUF', 'ISK',
                    'INR', 'IDR', 'XDR', 'IRR', 'IQD', 'IMP', 'ILS', 'JMD', 'JPY', 'JEP', 'JOD', 'KZT', 'KES', 'KPW', 'KRW', 'KWD', 'KGS',
                    'LAK', 'LBP', 'LSL', 'LRD', 'LYD', 'MOP', 'MKD', 'MGA', 'MWK', 'MYR', 'MVR', 'MRO', 'MUR', 'MXN', 'MDL', 'MNT',
                    ' MAD', 'MZN', 'MMK', 'NAD', 'NPR', 'ANG', 'NZD', 'NIO', 'NGN', 'NOK', 'OMR', 'PKR', 'PAB', 'PGK', 'PYG', 'PEN',
                    'PHP', 'PLN', 'QAR', 'RON', 'RUB', 'RWF', 'SHP', 'WST', 'STD', 'SAR', 'SPL', 'RSD', 'SCR', 'SLL', 'SGD', 'SBD', 'SOS',
                    'ZAR', 'LKR' 'SDG', 'SRD', 'SZL', 'SEK', 'CHF', 'SYP', 'TWD', 'TJS', 'TZS', 'THB', 'TOP', 'TTD', 'TND', 'TRY', 'TMT',
                    'TVD', 'UGX', 'UAH', 'AED', 'GBP', 'USD', 'UYU', 'UZS', 'VUV', 'VEF', 'VND', 'YER', 'ZMW', 'ZWD']

  def index
    respond_to do |format|
      format.html
      format.json
    end
  end

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