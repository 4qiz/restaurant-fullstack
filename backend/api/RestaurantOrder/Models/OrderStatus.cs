

namespace RestaurantOrder.Models
{
    public enum OrderStatus
    {
        PENDING, // Ожидает оплаты
        SUCCEEDED, // Оплачен
        CANCELLED, // Не оплачен, финальный статус

        CREATED, // создан
        COOKING, // Готовится
        WAITINGDELIVERY, // Ожидает курьера
        INDELIVERY, // В процессе доставки
        READYFORPICK, // Готов, ожидает получения
        RECEIVED, // Получен, финальный статус
        REFUND // Возврат средств
    }

    public enum MeasureUnit
    {
        GRAM, // граммы
        MILLILITERS, // миллилитры
        PIECES // штуки
    }

    public enum ProductItemSize
    {
        SMALL,
        MEDIUM,
        BIG
    }

    public enum PaymentType
    {
        ONLINE, // На сайте
        OFFLINE // При получении
    }
}
