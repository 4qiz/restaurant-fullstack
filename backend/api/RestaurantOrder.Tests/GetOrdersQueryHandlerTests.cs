using Moq;
using RestaurantOrder.Constants;
using RestaurantOrder.Data;
using RestaurantOrder.Interfaces;
using RestaurantOrder.Services.OrderQueries;
using RestaurantOrder.Services.QueryHandlers;
using System.Reflection.Metadata;

namespace RestaurantOrder.Tests
{
    public class GetOrdersQueryHandlerTests
    {
        private readonly Mock<IOrdersStrategy> _userStrategyMock;
        private readonly Mock<IOrdersStrategy> _adminStrategyMock;
        private readonly Mock<IOrdersStrategy> _deliveryStrategyMock;
        private readonly List<IOrdersStrategy> _strategies;
        private readonly OrdersRequestHandler _handler;

        public GetOrdersQueryHandlerTests()
        {
            _userStrategyMock = new Mock<IOrdersStrategy>();
            _adminStrategyMock = new Mock<IOrdersStrategy>();
            _deliveryStrategyMock = new Mock<IOrdersStrategy>();

            // Настраиваем стратегию: она должна срабатывать на определённую роль
            _userStrategyMock.Setup(s => s.CanHandle(UserRoles.USER)).Returns(true);
            _adminStrategyMock.Setup(s => s.CanHandle(UserRoles.ADMIN)).Returns(true);
            _deliveryStrategyMock.Setup(s => s.CanHandle(UserRoles.DELIVERY)).Returns(true);

            _strategies = new List<IOrdersStrategy>
        {
            _userStrategyMock.Object,
            _adminStrategyMock.Object,
            _deliveryStrategyMock.Object
        };

            _handler = new OrdersRequestHandler(null, _strategies); // БД не нужна для тестов стратегий
        }

        [Theory]
        [InlineData(UserRoles.USER)]
        [InlineData(UserRoles.ADMIN)]
        [InlineData(UserRoles.DELIVERY)]
        public async Task Handle_ShouldUseCorrectStrategy(string role)
        {
            // Arrange
            var query = new OrdersRequest(role, "userID", new Dtos.Order.OrdersFiltersDto());

            // Act
            await _handler.Handle(query, CancellationToken.None);

            // Assert (проверяем, что сработала нужная стратегия)
            _userStrategyMock.Verify(s =>
                s.GetOrders(
                    It.IsAny<AppDbContext>(),
                    It.IsAny<OrdersRequest>(),
                    It.IsAny<CancellationToken>()),
                role == UserRoles.USER ? Times.Once() : Times.Never());

            _adminStrategyMock.Verify(
                s => s.GetOrders(
                    It.IsAny<AppDbContext>(),
                    It.IsAny<OrdersRequest>(),
                    It.IsAny<CancellationToken>()),
                role == UserRoles.ADMIN ? Times.Once() : Times.Never());

            _deliveryStrategyMock.Verify(
                s => s.GetOrders(It.IsAny<AppDbContext>(),
                It.IsAny<OrdersRequest>(),
                It.IsAny<CancellationToken>()),
                role == UserRoles.DELIVERY ? Times.Once() : Times.Never());
        }

        /// <summary>
        /// Проверяет, что при передаче роли администратора (ADMIN)
        /// вызывается стратегия обработки заказов для администратора.
        /// </summary>
        /// <param name="role">Роль пользователя</param>
        [Theory]
        [InlineData(UserRoles.ADMIN)]
        public async Task Handle_ShouldUseAdminStrategy(string role)
        {
            // данные для тестирования
            var query = new OrdersRequest(role, "userID", new Dtos.Order.OrdersFiltersDto());

            // Вызов обработчика запросов
            await _handler.Handle(query, CancellationToken.None);

            // Проверяем, что стратегия администратора была вызвана ровно один раз                 
            _adminStrategyMock.Verify(
                s => s.GetOrders(
                    It.IsAny<AppDbContext>(),
                    It.IsAny<OrdersRequest>(),
                    It.IsAny<CancellationToken>()),
                Times.Once());
        }

        [Fact]
        public async Task Handle_ShouldThrowException_WhenNoStrategyFound()
        {
            // Arrange (Роль, для которой нет стратегии)
            var query = new OrdersRequest("UNKNOWN_ROLE", "userID", new Dtos.Order.OrdersFiltersDto());

            // Act & Assert
            await Assert.ThrowsAsync<UnauthorizedAccessException>(() =>
                _handler.Handle(query, CancellationToken.None));
        }
    }
}

